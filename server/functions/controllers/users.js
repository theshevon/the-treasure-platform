const { admin, db } = require('../util/admin');
const firebase      = require('firebase');
const fb_functions  = require('firebase-functions');
const nodemailer    = require('nodemailer');
const BusBoy        = require('busboy'),
      config        = require("../util/config"),
      path          = require('path'),
      fs            = require('fs'),
      os            = require('os');
const { validateRegistrationData,
        validateInvitationData,
        validateLoginData,
        validateInviteeData,
        validateSupportData } = require("../util/validators");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'treasureapp.au@gmail.com',
        pass: 'zexePnb9F0lHhk4C1777Tb2YVm'
    }
});

firebase.initializeApp(config);


exports.checkInvitee =

    (req, res) => {

        // extract user data from the form
        const invitee = {
            email: req.body.email,
            code: req.body.code
        }

        // validate data fields
        const { valid, errors } = validateInviteeData(invitee);
        if (!valid) return res.status(400).json(errors);

        // validate code against database entry
        db
            .collection('invitees')
            .doc(invitee.email)
            .get()
            .then(doc => {

                // error case 1: user has not been invited to the platform
                if (!doc.exists) return res.status(400).json({ general : "Sorry, the email address or code you entered was incorrect." });

                // error case 2: invitation has already been accepted
                if (doc.data().accepted) return res.status(400).json({ general : "Error: This invitation has already been accepted." });

                // success case
                if (doc.data().code === invitee.code){

                    // change accepted field to true
                    invitee.accepted = true;

                    // eslint-disable-next-line promise/no-nesting
                    return db
                            .collection('invitees')
                            .doc(invitee.email)
                            .set(invitee)
                            .then(() => {
                                return res.status(200).json("Success: User validated");
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(400).json({ error : err });
                            })
                }

                // error case 3: incorrect info entered
                return res.status(400).json({ general : "Sorry, the email address or code you entered was incorrect." });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({err: err});
            })
    }

exports.registerNewUser =

    (req, res) => {

        // extract user data from the form
        const newUser = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            pw: req.body.pw,
            pw_c: req.body.pw_c,
            imgSrc: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/users_no_img.png?alt=media`
        }

        // carry out validation
        const { valid, errors } = validateRegistrationData(newUser);
        if (!valid) return res.status(400).json(errors);

        // create new firebase user
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.pw)
            .then(data => {

                let uid = data.user.uid;

                // make a database entry to store the users info
                // by default, assumes that the user is a secondary user
                let userData = {
                    fname: newUser.fname,
                    lname: newUser.lname,
                    email: newUser.email,
                    uType: 1,
                    createdOn: admin.firestore.FieldValue.serverTimestamp(),
                    imgSrc: newUser.imgSrc
                }

                // eslint-disable-next-line promise/no-nesting
                return db
                        .collection("users")
                        .doc(uid)
                        .set(userData)
                        .then(() => {
                            return res.status(200).json(uid);
                        })
                        .catch(err => {
                            return res.status(400).json({ error: err });
                        })

            })
            .catch(err => {
                if (err.code === "auth/email-already-in-use"){
                    return res.status(400).json({ email: "Email is already in use" });
                } else {
                    return res.status(400).json({ error: err.code });
                }
            });

    }

exports.logInUser =

    (req, res) => {

        // Extract credentials from form
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // Validate credentials
        const { valid, errors } = validateLoginData(user);

        if (!valid) return res.status(400).json(errors);

        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(data => {
                return data.user.getIdToken();
            })
            .then(token => {
                return res.json({ token });
            })
            .catch(err => {
                console.log("Error: " + err);
                return res.status(400).json({ general: "Sorry, the email address or password you entered is incorrect." });
            });
    }

exports.logOutUser =

    (req, res) => {
        // Logout of the current user account
        firebase
            .auth()
            .signOut()
            .then(data => {
                return res.status(200).json("Success: Signed out.");
            })
            .catch(err => {
                console.log("Error: " + err)
                return res.status(500).json({ error: err.code });
            });
    }

exports.getSecondaryUsers =

    (req, res) => {

        // Get a list of all the secondary users from the database
        db.collection('users')
            .get()
            .then(data => {
                // Extract all userIDs
                let users = [];
                data.forEach((doc) => {
                    if (parseInt(doc.data()["uType"]) === 1){
                        let user = {
                                        uid  : doc.id,
                                        name : doc.data().fname + " " + doc.data().lname,
                                        img  : doc.data().imgSrc
                                    };
                        users.push(user);
                    }
                });
                return res.json(users);
            })
            .catch((err) => {
                res.status(500).json({ error: err.code });
            });
    }

exports.getAuthenticatedUser =

    (req, res) => {

        db.collection('users')
            .doc(req.user.id)
            .get()
            .then(doc => {
                let user = {};
                user.id      = doc.id;
                user.name    = `${doc.data()['fname']} ${doc.data()['lname']}`;
                user.type    = doc.data()['uType'];
                user.imgSrc  = doc.data()['imgSrc'];
                return res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json(err);
            })

    }

// uploads a single image to firebase storage
exports.uploadImg =

    // Response codes:
    // 200 :- No Error
    // 101 :- Error : Document does not exist
    // 102 :- Error : Incorrect file type
    // 103 :- Error : Failed to link image URI to database entry
    // 104 :- Error : Failed to upload image to firebase storage
    // 105 :- Error : Other error

    async (req, res) => {

        // find the database entry for the required item
        await db
                .collection('users')
                .doc(req.params.id)
                .get()
                .then(doc => {

                    // eslint-disable-next-line promise/always-return
                    if (!doc.exists){
                        return res.status(400).json({ code : 101 });
                    }

                    const busboy = new BusBoy({ headers: req.headers });

                    let imageToBeUploaded = {};
                    let imageFileName;

                    // prepare the image file
                    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                        // check if the file type is that of an image
                        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
                            return res.status(400).json({ code : 102 });
                        }

                        // create a unique name for the image
                        const imageExtension = filename.split('.')[filename.split('.').length - 1];
                        imageFileName = `users_${req.params.id}.${imageExtension}`;

                        // upload the image
                        const filepath = path.join(os.tmpdir(), imageFileName);
                        imageToBeUploaded = { filepath, mimetype };
                        file.pipe(fs.createWriteStream(filepath));
                    });

                    // store the image on firebase storage
                    busboy.on('finish', () => {

                        // eslint-disable-next-line promise/no-nesting
                        admin
                        .storage()
                        .bucket(config.storageBucket)
                        .upload(imageToBeUploaded.filepath, {
                            resumable: false,
                            metadata: {
                                metadata: {
                                    contentType: imageToBeUploaded.mimetype
                                }
                            }
                        })
                        .then(() => {

                            // determine the imageURL and add it to the item's database entry
                            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

                            // update databse entry
                            // eslint-disable-next-line promise/no-nesting
                            return db
                                    .collection('users')
                                    .doc(doc.id)
                                    .update({ imgSrc : imageUrl })
                                    .then(() => {
                                        return res.status(200).json({ code : 200 });
                                    })
                                    // eslint-disable-next-line handle-callback-err
                                    .catch(err => {
                                        console.log(err);
                                        return res.status(400).json({ code : 103 });
                                    })

                        })
                        // eslint-disable-next-line handle-callback-err
                        .catch(err => {
                            console.log(err);
                            return res.status(400).json({ code : 104 });
                        });
                    });

                    busboy.end(req.rawBody);
                })

                // eslint-disable-next-line handle-callback-err
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({ code : 105 });
                });
    }

exports.inviteNewUsers =

    async (req, res) => {

        // extract emails from the request body
        const emails = req.body.emails;

        // validate email addresses
        const { allInvalid, errors } = validateInvitationData(emails);
        if (allInvalid) return res.status(400).json(errors);

        let registeredEmails = [];

        // retrieve all the email addresses of registered users
        await db.collection('users')
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        registeredEmails.push(doc.data()['email']);
                    });
                    return;
                })
                .catch(err => {
                    res.status(400).json(err);
                });


        for (var i = 0; i < emails.length; i++) {

            if (errors[i] || emails[i] === '')  continue;

            var email = emails[i];

            // check if email already belongs to a registered user
            for (var j=0; j<registeredEmails.length; j++){
                if (email === registeredEmails[j]){
                    errors[i] = "This email already belongs to a registered user";
                    break;
                }
            }

            if (errors[i])  continue;

            // create new invitee doc
            let newUser = db.collection('invitees').doc(email);

            // generate unique invite code for invitee
            let code = Math.random().toString(36).substring(2, 10);

            // assign data to invitee doc
            newUser.set({
                            accepted : false,
                            code     : code,
                        });

            // Generate invitation email with invite code
            const mailOptions = {
                from: 'Treasure Platform <noreply@treasure.firebase.com>',
                to: email,
                subject: 'Welcome to Treasure',
                html:
                    `<h2 style="color: #a7bfe8;">Welcome!</h2>
                    <p style="font-size: 16px; color: black">You have been invited to join the <span style="color: #fed766; font-weight: bold;">Treasure</span> Platform!</p>
                    <p style="font-size: 16px;">Click on this <a href="https://comp30022app.firebaseapp.com/register">link</a>
                    and enter the invite code <span style="border-radius:5px; border: 0.5px solid black; background: #f8f9fa; padding: 2px; font-weight: bold;">${code}</span> to set up your account now!</p>`
            }

            // Send invitation email to new invitee
            /* eslint-disable no-await-in-loop */
            try {
                await sendEmail(mailOptions);
            } catch (err) {
                errors[i] = `Email could not be sent to ${email}`;
            }
        }

        // return errors, if they were found.
        // else, return success
        if (Object.keys(errors).length === 0){
            return res.status(200).json("Success: All invites sent");
        }
        return res.status(400).json(errors);
    }


exports.sendSupportMessage =

    async (req, res) => {

        const supportData = {
                                subject : req.body.subject,
                                message : req.body.message
                            }

        // carry out validation
        const { valid, errors } = validateSupportData(supportData);
        if (!valid) return res.status(400).json(errors);

        const mailOptions = {
            from: 'Treasure Platform <noreply@treasure.firebase.com>',
            to: 'treasureapp.au@gmail.com',
            subject: `Support Request: ${supportData.subject}`,
            html:
                `<p style="font-size: 16px; color: black;">${req.user.name}<i>(UID: ${req.user.id})</i> wrote:</p>
                <br>
                <p style="font-size: 16px; color: black; background: #f8f9fa">${supportData.message}</p>`
        };

        // send email
        /* eslint-disable no-await-in-loop */
        try {
            await sendEmail(mailOptions);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ general : "Sorry, something went wrong!"});
        }

        return res.status(200).json("Success: Support message sent");
    }

/*=============================HELPER FUNCTIONS===============================*/

sendEmail =

    (mailOptions) => {

        try {
                return new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log(`Successfully emailed!`);
                            resolve(info);
                        }
                    });
                });
        } catch (err) {
                console.log('error: ' + err);
        }

        return null;
    }

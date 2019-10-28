const config        = require("../util/config"),
      { admin, db } = require('../util/admin'),
      nodemailer    = require('nodemailer'),
      firebase      = require('firebase'),
      BusBoy        = require('busboy'),
      path          = require('path'),
      fs            = require('fs'),
      os            = require('os');

const { validateRegistrationData,
        validateInvitationData,
        validateInviteeData,
        validateSupportData,
        validateLoginData,
      } = require("../util/validators");

const transporter
    = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'treasureapp.au@gmail.com',
                                        pass: 'zexePnb9F0lHhk4C1777Tb2YVm'
                                    }
                                });

firebase.initializeApp(config);

/**
 * Verifies that a potential user has indeed been invited to the platform.
 */
exports.checkInvitee =

    (req, res) => {

        // extract user data from the form
        const invitee = {
            email: req.body.email,
            code: req.body.code
        }

        // validate data fields
        const { valid, errors } = validateInviteeData(invitee);

        // if invalid, send the errors back to the client
        if (!valid) return res.status(400).json(errors);

        // validate code against database entry
        return db
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
                        return res.status(200).json("Success: User validated");
                    }

                    // error case 3: incorrect info entered
                    return res.status(400).json({ general : "Sorry, the email address or code you entered was incorrect." });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({ general : "Sorry, something went wrong." });
                });
    }

/**
 * Registers a new user on the platform.
 */
exports.registerNewUser =

    (req, res) => {

        // extract user data from the form
        const newUser = {
            fname  : req.body.fname,
            lname  : req.body.lname,
            email  : req.body.email,
            pw     : req.body.pw,
            pw_c   : req.body.pw_c,
            imgSrc : `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/users_no_img.png?alt=media`
        }

        // carry out validation
        const { valid, errors } = validateRegistrationData(newUser);

        // if invalid, send the errors back to the client
        if (!valid) return res.status(400).json(errors);

        // create new firebase user
        return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.pw)
                .then(async data => {

                    let uid = data.user.uid;

                    // make a database entry to store the users info
                    // by default, assumes that the user is a secondary user

                    let userData = {
                        fname     : newUser.fname,
                        lname     : newUser.lname,
                        email     : newUser.email,
                        uType     : 1,
                        createdOn : admin.firestore.FieldValue.serverTimestamp(),
                        imgSrc    : newUser.imgSrc
                    }

                    try {
                        await db
                            .collection("users")
                            .doc(uid)
                            .set(userData);
                        return { uid : uid, email: userData.email };
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(400).json({ general: "Sorry, something went wrong." });
                    }

                })
                .then(async data => {

                    // updates the `invitees` collection to denote that the
                    // invitation has been accepted
                    try {
                        await db
                                .collection('invitees')
                                .doc(data.email)
                                .update({ accepted: true });
                        return res.status(200).json(data.uid);
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(400).json({ general: "Sorry, something went wrong." });
                    }
                })
                .catch(err => {

                    console.log(err);

                    // send messages based on error code
                    if (err.code === "auth/email-already-in-use"){
                        return res.status(400).json({ email: "Email is already in use" });
                    }
                    else if (err.code === "auth/weak-password"){
                        return res.status(400).json({ pw : err.message });
                    }
                    else {
                        return res.status(400).json({ general: "Sorry, something went wrong." });
                    }
                });
    }

/**
 * Logs in a user to the platform and returns an authentication token, along
 * with the name, user type and image src belonging to that user.
 */
exports.logInUser =

    (req, res) => {

        // extract credentials from form
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // validate credentials
        const { valid, errors } = validateLoginData(user);

        // if invalid, send the errors back to the client
        if (!valid) return res.status(400).json(errors);

        var uid;

        return firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(data => {
                    uid = data.user.uid;
                    return data.user.getIdToken();
                })
                .then(async token => {

                    let returnData = await getAuthenticatedUser(uid);
                    returnData.id = uid;
                    returnData.token = token;

                    return res.status(200).json(returnData);
                })
                .catch(err => {
                    console.log("Error: " + err);
                    return res.status(400).json({ general: "Sorry, the email address or password you entered is incorrect." });
                });
    } 

/**
 * Retrieves the uid, name and image src of all the secondary users registered
 * on the platform.
 */
exports.getSecondaryUsers =

    async (req, res) => {

        // get a list of all the secondary users from the database
        try {
            const data = await db
                                .collection('users')
                                .get();

            // extract the user's uid, name and image src
            let users = [];
            data.forEach((doc) => {
                if (parseInt(doc.data()["uType"]) === 1) {
                    let user = {
                        uid: doc.id,
                        name: doc.data().fname + " " + doc.data().lname,
                        img: doc.data().imgSrc
                    };
                    users.push(user);
                }
            });

            return res.status(200).json(users);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ error: err.code });
        }
    }

/**
 * Uploads a single image to firebase storage that will act as a user's profile
 * picture.
 */
exports.uploadImg =

    async (req, res) => {

        const errMsg = "Sorry, something went wrong with the image upload. You can still head over to the login page and log in.";

        // find the database entry for the required item
        return await db
                        .collection('users')
                        .doc(req.params.id)
                        .get()
                        .then(doc => {

                            if (!doc.exists){
                                // document does not exist
                                return res.status(400).json({ general: errMsg });
                            }

                            const busboy = new BusBoy({ headers: req.headers });

                            let imageToBeUploaded = {};
                            let imageFileName;

                            // prepare the image file
                            busboy.on('file', (_fieldname, file, filename, _encoding, mimetype) => {

                                // check if the file type is that of an image
                                if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
                                    // incorrect file type
                                    return res.status(400).json({ general: errMsg });
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
                                    .then(async () => {

                                        // determine the imageURL and add it to the item's database entry
                                        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

                                        // update databse entry
                                        try {
                                            await db
                                                    .collection('users')
                                                    .doc(doc.id)
                                                    .update({ imgSrc: imageUrl });

                                            // successful update
                                            return res.status(200).json("Success!");
                                        }
                                        catch (err) {
                                            console.log(err);
                                            // failed to link image URI to database entry
                                            return res.status(400).json({ general: errMsg });
                                        }

                                    })
                                    .catch(err => {
                                        console.log(err);
                                        // failed to upload image to firebase storage
                                        return res.status(400).json({ general: errMsg  });
                                    });
                            });

                            busboy.end(req.rawBody);

                            return res.status(200).json("Success!");
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(400).json({ general: errMsg  });
                        });
    }

/**
 * Sends emails with the invite codes to potential users of the platform.
 */
exports.inviteNewUsers =

    async (req, res) => {

        // extract emails from the request body
        const emails = req.body.emails;

        // validate email addresses
        const { allInvalid, errors } = validateInvitationData(emails);
        if (allInvalid) return res.status(400).json(errors);

        // retrieve all the email addresses of registered users
        try{
            const registeredEmails = await db
                                            .collection('users')
                                            .get()
                                            .then(data => {
                                                let emails = [];
                                                data.forEach((doc) => {
                                                    emails.push(doc.data()['email']);
                                                });
                                                return emails;
                                            })
                                            .catch(err => {
                                                throw new Error(err);
                                            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ "general" : "Sorry something went wrong!"});
        }

        // email the new invitees
        for (var i = 0; i < emails.length; i++) {

            // only email address which aren't empty and don't have errors
            if (errors[i] || emails[i] === '') continue;

            var email = emails[i];

            // check if email already belongs to a registered user
            for (var j=0; j<registeredEmails.length; j++){
                if (email === registeredEmails[j]){
                    errors[i] = "This email already belongs to a registered user";
                    break;
                }
            }

            if (errors[i]) continue;

            // create new invitee doc
            let newUser = db.collection('invitees').doc(email);

            // generate unique invite code for invitee
            let code = Math.random().toString(36).substring(2, 10);

            // assign data to invitee doc
            newUser.set({
                            accepted : false,
                            code     : code,
                        });

            // generate invitation email with invite code
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
            try {
                // eslint-disable-next-line no-await-in-loop
                await sendEmail(mailOptions);
            } catch (err) {
                console.log(err);
                errors[i] = `Email could not be sent to ${email}`;
            }
        }

        // return errors, if they were found
        // else, return success
        if (Object.keys(errors).length === 0){
            return res.status(200).json("Success: All invites sent");
        }
        return res.status(400).json(errors);
    }

/**
 * Emails a user's support request to the development team's email account.
 */
exports.sendSupportMessage =

    async (req, res) => {

        const supportData = {
                                subject : req.body.subject,
                                message : req.body.message
                            }

        // carry out validation
        const { valid, errors } = validateSupportData(supportData);

        // if validation fails, return the errors to the client
        if (!valid) return res.status(400).json(errors);

        const mailOptions = {
            from: 'Treasure Platform <noreply@treasure.firebase.com>',
            to: 'treasureapp.au@gmail.com',
            subject: `Support Request: ${supportData.subject}`,
            html:
                `
                <p
                    style="font-size: 15px; color: black;">
                    Message:
                </p>
                <p
                    style="font-size: 14px; color: black; font-weight: light; background: #f8f9fa; border-radius: 5px; padding: 5px; box-sizing: border-box;">
                    <i>
                        ${supportData.message}
                    </i>
                </p>
                <p
                    style="font-size: 15px; color: black;">User details:
                    <ul>
                        <li> UserID : ${req.user.id}   </li>
                        <li> Name   : ${req.user.name} </li>
                        <li> Email  : ${req.user.email} </li>
                    </ul>
                </p>`
        };

        // send email
        try {
            await sendEmail(mailOptions);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ general : "Sorry, something went wrong!"});
        }

        return res.status(200).json("Success: Support message sent");
    }

/*=============================HELPER FUNCTIONS===============================*/

/**
 * Retrieves details about the currently logged-in user.
 */
getAuthenticatedUser =

    async (uid) => {

        return await db
                        .collection('users')
                        .doc(uid)
                        .get()
                        .then(doc => {
                            let user = {};
                            user.name    = `${doc.data()['fname']} ${doc.data()['lname']}`;
                            user.type    = doc.data()['uType'];
                            user.imgSrc  = doc.data()['imgSrc'];
                            return user;
                        })
                        .catch(err => {
                            console.log(err);
                            throw new Error(err);
                        });
    }

/**
 * Sends an email with the specified mail options.
 */
sendEmail =

    (mailOptions) => {

        try {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
            });
        } catch (err) {
            console.log('error: ' + err);
        }

        return null;
    }

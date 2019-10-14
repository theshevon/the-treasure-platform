const { admin, db } = require('../util/admin');
const firebase      = require('firebase');
const fb_functions  = require('firebase-functions');
const nodemailer    = require('nodemailer');
const config        = require('../util/config');
const { validateRegistrationData,
        validateLoginData,
        validateInviteeData } = require("../util/validators");

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
            .doc(email)
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
                            .doc(email)
                            .set(invitee)
                            .then(() => {
                                return res.status(200).json("Success: User validated");
                            })
                            .catch(err => {
                                return res.status(500).json({ error : err });
                            })
                }

                // error case 3: incorrect info entered
                return res.status(400).json({ general : "Sorry, the email address or code you entered was incorrect." });
            })
            .catch(err => {
                res.status(500).json({err: err});
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
            pw_c: req.body.pw_c
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
                    utype: 1,
                    createdOn: admin.firestore.FieldValue.serverTimestamp(),
                    intItems: []
                }

                // eslint-disable-next-line promise/no-nesting
                return db
                        .collection("users")
                        .doc(uid)
                        .set(userData)
                        .then(() => {
                            return res.status(200).json("Success: new user created.");
                        })
                        .catch(err => {
                            return res.status(500).json({ error: err });
                        })

            })
            .catch(err => {
                if (err.code === "auth/email-already-in-use"){
                    return res.status(400).json({ email: "Email is already in use" });
                } else {
                    return res.status(500).json({ error: err.code });
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
                return res.status(403).json({ general: "Sorry, the email address or password you entered is incorrect." });
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

exports.getUsers =

    (req, res) => {

        // Get a list of all the secondary users from the database
        db.collection('users')
            .get()
            .then((data) => {
                // Extract all userIDs
                let users = [];
                data.forEach((doc) => {
                    if (doc.data().utype === 1){
                        let user = {
                                    uid : doc.id,
                                    name : doc.data().fname + " " + doc.data().lname,
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


    exports.inviteNewUsers =

        async (req, res) => {

            // Creates new invitee from an array of JSON objects containing
            // names and emails, and emails each invitee a unique invite code

            let errors = {};

            //// TODO: Validate input

            const emailArray = req.body.emails;
            console.log(emailArray);

            console.log(emailArray.length);

            //ensure that the request is not empty
            if (emailArray.length === 0) {
                console.log('no email addresses entered');
                return res.status(400);
            }

            console.log(emailArray[0]);

            for (var i = 0; i < emailArray.length; i++) {
                var inviteeEmail = emailArray[i];

                // loop over all users to check for duplicate email

                db.collection('users')
                    .get()
                    .then((data) => {
                        data.forEach((doc) => {
                            if (doc.data().email === inviteeEmail) {

                                // Duplicate email; abort and return error
                                errors[i]
                                    =`Email ${inviteeEmail} is already registered`;
                            }
                            return null;
                        });
                        return null;
                    })
                    .catch(err => {
                        errors[i] = `firestore error: ${err}`;
                        return errors;
                    });

                // Check for error
                if (!errors[i]) {
                    // Create new invitee doc
                    let newUser = db.collection('invitees').doc(inviteeEmail)
                        .catch(err => {
                            errors["general"]
                                = `firestore error for email ${inviteeEmail}: ${err}`;
                            return errors;
                        });
                    console.log("new user, id: " + newUser.id);

                    // Generate unique invite code for invitee
                    let rawkey = Math.random().toString(36).substring(2, 12);
                    const key = generateUniqueInviteCode(rawkey);

                    if (key === null) {
                        errors[i] = "Unique code generation failed. Try again.";
                    }
                    else {
                        // Assign data to invitee doc
                        newUser.set({
                                accepted: false,
                                code: key
                            });

                        console.log("Invitee added: " + inviteeEmail + ", code: " + key);

                        // Generate invitation email with key code
                        const mailOptions = {
                            from: 'Treasure App <treasureapp.au@gmail.com>',
                            to: inviteeEmail,
                            subject: 'Welcome to Treasure', // email subject
                            html: `<p style="font-size: 16px;">Welcome!</p>
                                <br />
                                <p style="font-size: 16px;">You have been invited to join
                                Treasure.</p>
                                <p style="font-size: 16px;">Go to localhost:5000/register
                                and enter the invite
                                code ${key} to set up your account.</p>` // email content
                        };

                        // Send invitation email to new invitee
                        /* eslint-disable no-await-in-loop */
                        try {
                            await sendMail(mailOptions);
                        /* eslint-enable no-await-in-loop */
                        } catch (err) {
                            errors[i] = `Email could not be sent to ${inviteeEmail}`;
                        }
                    }
                }
            }

            // Check for errors
            if (Object.keys(errors).length === 0) {
                return res.status(200).json("Success: All invites sent");
            }
            return errors;

        }


exports.sendMailToAddress =

    async (req, res) => {

        // getting dest email by query string

        const mailOptions = {
            from: 'User <>', // Something like: Jane Doe <janedoe@gmail.com>
            to: req.dest,
            subject: 'Subject', // email subject
            html: `<p style="font-size: 16px;">Message</p>
                <br />
            ` // email content in HTML
        };

        console.log('start');
        try {
            await sendMail(mailOptions);
        } catch (err) {
            return res.send(err.toString());
            // throw err;
        }

        return res.send('Email sent');
    }

/*=============================HELPER FUNCTIONS===============================*/

generateUniqueInviteCode =

    (raw) => {
        // Generates a unique invite code from the randomly generated raw input

        const codeLength = 8;
        let usedCodes = [];

        db.collection('invitees')
            .get()
            .then((data) => {
                // Extract all invite codes
                data.forEach((doc) => {
                    if (doc.data().code){
                        usedCodes.push(doc.data().code);
                    }
                    return null;
                });
                return null;
            })
            .catch(err => {
                console.log(err);
                return null;
            });

        // Return 'codeLength'-char substring of raw
        for (var i = 0; i + codeLength < raw.length; i++) {
            const code = raw.substring(0 + i, codeLength + i);

            if (!(usedCodes.includes(code))) {
                return code;
            }
        }

        // Key generation failed
        return null;

    }


sendMail

    = (mailOptions) => {

       try {
           return new Promise((resolve, reject) => {
              transporter.sendMail(mailOptions, (err, info) => {
                 if (err) {
                    console.log("error: ", err);
                    reject(err);
                 } else {
                    console.log(`Mail sent successfully!`);
                    resolve(info);
                 }
              });
           });
       } catch (err) {
           console.log('error: ' + err);
       }

       return null;
    }

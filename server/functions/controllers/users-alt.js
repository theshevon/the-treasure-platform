const { admin, db } = require('../util/admin');
const firebase      = require('firebase');
const fb_functions  = require('firebase-functions');
const nodemailer    = require('nodemailer');
const config        = require('../util/config');
const { validateRegistrationData,
        validateInvitationData,
        validateInviteeData,
        validateLoginData,
        } = require("../util/validators");

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
                                    name : doc.data().fname + doc.data().lname,
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

checkEmails =

    async (email) => {
        try {
            let code = db
                        .collection('invitees')
                        .doc(email)
                        .get()
                        .then(doc => {

                            if (doc.exists){

                                // the user has already been invited so check if
                                // they've already accepted their invites. If so, log
                                // it as an error, else, reinvite them with a new code
                                if (doc.data().accepted){
                                    return -1;
                                } else {
                                    return -2;
                                }
                            }
                            return 0;
                        }).catch(err => {
                            throw err;
                        });
            return code;
        } catch (err) {
            return -500;
        }
    }

exports.inviteNewUsers =

    async (req, res) => {

        // extract emails from the form
        let emails = req.body.emails;

        // validate email addresses
        const { allInvalid, errors } = validateInvitationData(emails);
        if (allInvalid) return res.status(400).json(errors);

        console.log("1");
        emails.forEach(async (email, index) => {

            // ignore emails which have been flagged for errors
            if (errors[index] || email === '') return;

            // decide if the user needs to be reinvited
            let reinvite = false;
            console.log(2);
            // check if the user has already been invited to the platform
            let checkEmail = await checkEmails(email);
            if (checkEmail === -500){
                errors["general"] = "Sorry, something went wrong. Please try again!";
            } else if (checkEmail === -1){
                errors[i] = "A user with this email is already on this platform"
            } else if (checkEmail === -2){
                reinvite = true;
            }

            console.log("3");

            // proceed only if no errors for this email
            if (!errors[index] || reinvite) {

                // Create new invitee
                let code        = Math.random().toString(36).substr(2, 8);
                let inviteeData =   {
                                        code     : code,
                                        accepted : false
                                    }
                db
                    .collection('invitees')
                    .doc(email)
                    .set(inviteeData)
                    .then(doc => {
                        return;
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({ general : "Sorry, something went wrong. Please try again!"})
                    })

                // generate invitation email with key code
                const mailOptions = {
                    from: 'Treasure Platform <noreply@treasure.firebase.com>',
                    to: email,
                    subject: 'Welcome to Treasure',
                    html:
                        `<p style="font-size: 16px;">Welcome!</p>
                        <br />
                        <p style="font-size: 16px;">You have been invited to join the Treasure Platform!</p>
                        <p style="font-size: 16px;">Click on this <a href="https://localhost:5000/register">link</a>
                        and enter the invite code "${code}" to set up your account now!</p>`
                }

                // send invitation email to new invitee
                console.log("lol");
                try {
                    await sendMail(mailOptions);
                } catch (err) {
                    errors[i] = `Email could not be sent to ${email}`;
                }
            }
        });

        // returns errors array as a response
        return res.status(200).json(errors);
    }

/*=============================HELPER FUNCTIONS===============================*/


sendMail =

    async (mailOptions) => {
        console.log("here");
        try {
            await new Promise((resolve, reject) => {
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
            return;
        } catch (err) {
            console.log('error: ' + err);
        }
    }

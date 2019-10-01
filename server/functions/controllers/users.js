const { admin, db } = require('../util/admin');
const firebase      = require('firebase');
const config        = require('../util/config');
const { validateRegistrationData, validateLoginData, validateInviteeData } = require("../util/validators");

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
                    db
                        .collection('invitees')
                        .doc(invitee.email)
                        .set(invitee);

                    return res.status(200).json({ general : "Success: User validated" });
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
                    createdon: admin.firestore.FieldValue.serverTimestamp(),
                    intitems: []
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
                            return res.status(500).json(err);
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

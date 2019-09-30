const { admin, db } = require('../util/admin');
const firebase      = require('firebase');
const config        = require('../util/config');
const { validateRegistrationData, validateLoginData } = require("../util/validators");

firebase.initializeApp(config);

exports.checkInvitee =

    (req, res) => {

        // extract user data from the form
        const invitee = {
            email: req.body.email,
            code: req.body.code
        }

        // TODO: carry out validation


        // validate code against database entry
        db
            .collection('invitees')
            .doc(invitee.email)
            .get()
            .then(doc => {
                if (!doc.exists) return res.status(400).json("Sorry, you have not been invited to join this platform");
                if (doc.data().code === invitee.code){
                    return res.status(200).json({success: "User validated"});
                }
                return res.status(400).json({Error: "Error"});
            })
            .catch(err => {
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
            password: req.body.pw,
            confirmPassword: req.body.pw_c
        }

        // carry out validation
        const { valid, errors } = validateRegistrationData(newUser);
        if (!valid) return res.status(400).json(errors);

        // create new firebase user
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
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
                    intitems: null
                }

                newUserDoc = db
                                .collection("users")
                                .doc(uid)
                                .set(userData)

                return res.status(200).json(" success: new user created.");
            })
            .catch(err => {
                if (err.code === "auth/email-already-in-use"){
                    return res.status(400).json({ email: "Email is already in use" });
                } else {
                    return res.status(500).json({ error: err.code });
                }
            });

        return res.status(200).json(" success: new user created.");
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
        // Get a list of all users from the database
        db.collection('users')
            .get()
            .then((data) => {
                // Extract all userIDs
                let users = [];
                data.forEach((doc) => {
                    if (doc.data().utype === 2){
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

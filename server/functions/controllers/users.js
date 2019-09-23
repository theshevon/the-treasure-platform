const { db } = require('../util/admin');
const firebase = require('firebase');
const config = require('../util/config');
firebase.initializeApp(config);

const { validateRegistrationData, validateLoginData } = require("../util/validators");

exports.registerNewUser =

    (req, res) => {

        // extract user data from the form
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            handle: req.body.handle,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        // carry out validation
        const { valid, errors } = validateRegistrationData(newUser);
        if (!valid) return res.status(400).json(errors);

        db.doc(`/users/${ newUser.handle }`)
            .get()
            .then(doc => {
                if (doc.exists){
                    return res
                            .status(400)
                            .json({
                                    handle: "this handle is already taken"
                                });
                } else {
                    return firebase
                            .auth()
                            .createUserWithEmailAndPassword(newUser.email, newUser.password);
                }
            })

            // the new user has been created so return an access/ auth token so that
            // the user will be able to use it to request more data
            .then(data => {
                return data.user.getIdToken();
            })

            .then(token => {
                return res.status(201).json({ token });
            })

            .catch(err => {
                console.error(err);
                if (err.code === "auth/email-already-in-use"){
                    return res.status(400).json({ email: "Email is already in use" });
                } else {
                    return res.status(500).json({ error: err.code });
                }
            })
    }

exports.logInUser =

    (req, res) => {

        // extract credentials from form
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // validate credentials
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
            })
    }

exports.getUsers =

    (req, res) => {
        db.collection('users')
            .get()
            .then((data) => {
                //extract all userIDs
                let users = [];
                data.forEach((doc) => {
                    let user = {userID : doc.data().userID,
                                firstName : doc.data().firstName,
                                lastName : doc.data().lastName};
                    users.push(user);
                });
                return res.json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
    }

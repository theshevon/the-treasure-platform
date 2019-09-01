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
            handle: req.body.handle
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
                            .auth
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
                console.error(err);
                if (err.code === "auth/wrong-password"){
                    return res.status(403).json({ general: "Wrong credentials, please try again!" });
                }
                return res.status(500).json({ error: err.code });
            })
    }


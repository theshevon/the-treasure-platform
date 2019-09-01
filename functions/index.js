const functions = require('firebase-functions'),
      firebase  = require('firebase'),
      express   = require('express'),
      admin     = require('firebase-admin');

const app       = express();

/*=================================CONFIG=====================================*/

// the application already knows ID of app cuz of firebase config so no need to
// pass app name as an argument
admin.initializeApp();

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQoI9ZDJFUvvfzgs33imhdQZjDPbC1R6M",
    authDomain: "comp30022app.firebaseapp.com",
    databaseURL: "https://comp30022app.firebaseio.com",
    projectId: "comp30022app",
    storageBucket: "",
    messagingSenderId: "774680972637",
    appId: "1:774680972637:web:3278e5ec01fbb7a4"
};

firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

/*=================================ROUTING====================================*/

// helper methods
const isEmpty = (string) => {
    return (string.trim() === "");
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}

// registration route
app.post("/register", (req, res) => {

    // extract user data from the form
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }

    // -- carry out error checking

    let errors = {};

    if (isEmpty(newUser.email)){
        errors.email = "Must not be empty";
    } else if (!isEmail(newUser.email)){
        errors.email = "Must be a valid email address";
    }

    if (isEmpty(newUser.password)) errors.password = "Must not be empty";

    if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords must match";

    if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

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
});

// all items GET route
app.get("/items", (req, res) => {

});

// TODO: figure out how to change region to Australia (currently
// "australia-southeast1" is an invalid argument for .regions())
exports.api = functions.https.onRequest(app);
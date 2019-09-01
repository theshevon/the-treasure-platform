const functions = require('firebase-functions'),
      firebase  = require('firebase'),
      express   = require('express'),
      admin     = require('firebase-admin');

const app       = express();

/*=================================CONFIG=====================================*/

// application already knows ID of app cuz of firebase config so no need to pass
// app name as an argument
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

// registration route
app.post("/register", (req, res) => {

});

// all items GET route
app.get("/items", (req, res) => {

});

// TODO: figure out how to change region to Australia (currently
// "australia-southeast1" is an invalid argument for .regions())
exports.api = functions.https.onRequest(app);
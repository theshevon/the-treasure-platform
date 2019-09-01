const functions = require('firebase-functions'),
      express   = require('express');

const app       = express();

// mount controllers
const { registerNewUser, logInUser } = require("./controllers/users");

/*=================================ROUTING====================================*/

// -- admin routes
app.post("/register", registerNewUser); // registration route
app.post("/login", logInUser); // login route

/*============================================================================*/

// TODO: figure out how to change region to Australia (currently
// "australia-southeast1" is an invalid argument for .regions())
exports.api = functions.https.onRequest(app);
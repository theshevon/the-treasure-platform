const admin = require('firebase-admin');

var serviceAccount = require("./service_key.json");

// the application already knows ID of app cuz of firebase config so no need to
// pass app name as an argument
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://comp30022app.firebaseio.com"
  });


const db = admin.firestore();

module.exports = { admin, db };
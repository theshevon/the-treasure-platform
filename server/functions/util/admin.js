const admin = require('firebase-admin');

var serviceAccount = require("./service_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://comp30022app.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
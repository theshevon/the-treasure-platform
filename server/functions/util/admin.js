const admin = require('firebase-admin');

// the application already knows ID of app cuz of firebase config so no need to
// pass app name as an argument
admin.initializeApp({});

const db = admin.firestore();

module.exports = { admin, db };
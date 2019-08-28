import firebase from 'firebase';

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

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
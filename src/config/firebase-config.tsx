import firebase from 'firebase'

let firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "weather-dashboard-320311.firebaseapp.com",
    projectId: "weather-dashboard-320311",
    storageBucket: "weather-dashboard-320311.appspot.com",
    messagingSenderId: "227188988395",
    appId: "1:227188988395:web:ebd6df4144b4c082c2a1ae"
};

firebase.initializeApp(firebaseConfig);

export { firebase }
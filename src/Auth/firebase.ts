import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGvkaJ6XR5OWoekbdvGEDvCsS86a2p5GU",
    authDomain: "designguy-radio-app.firebaseapp.com",
    projectId: "designguy-radio-app",
    storageBucket: "designguy-radio-app.appspot.com",
    messagingSenderId: "806931956725",
    appId: "1:806931956725:web:44aea5f4fa94c93d5e16bc",
    measurementId: "G-MKGEKZJX1V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);


export  { app, auth, analytics };

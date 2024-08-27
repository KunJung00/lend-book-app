// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlhrZgM0Mfb7wJqOMiNiVDmb5ypiOBmTo",
    authDomain: "database-bookleading.firebaseapp.com",
    databaseURL: "https://database-bookleading-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "database-bookleading",
    storageBucket: "database-bookleading.appspot.com",
    messagingSenderId: "572299860240",
    appId: "1:572299860240:web:5b274022b42c79c531ad95",
    measurementId: "G-N90F2P9GTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {
    database
};


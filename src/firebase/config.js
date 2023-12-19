// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbpCM6VEgIJQrfAjiw4DILwzFppLhpcVY",
    authDomain: "un-diario-react.firebaseapp.com",
    projectId: "un-diario-react",
    storageBucket: "un-diario-react.appspot.com",
    messagingSenderId: "881626220007",
    appId: "1:881626220007:web:5c0d5a0618dae40b7b2942"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
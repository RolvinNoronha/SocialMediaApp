// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


export const firebaseConfig = {
  apiKey: "AIzaSyCRLry80O_038GsqWz1xEE3LjziPzUDpwo",
  authDomain: "instaclone-eb668.firebaseapp.com",
  projectId: "instaclone-eb668",
  storageBucket: "instaclone-eb668.appspot.com",
  messagingSenderId: "546984138463",
  appId: "1:546984138463:web:8a322fae4bcf47242bbb6a",
  measurementId: "G-ZMXSCPSPTC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage }
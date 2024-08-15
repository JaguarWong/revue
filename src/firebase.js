// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEiyPDMzfiB_P1BF-AMZVOlckovWkAFtU",
    authDomain: "revue-8f031.firebaseapp.com",
    projectId: "revue-8f031",
    storageBucket: "revue-8f031.appspot.com",
    messagingSenderId: "980401304540",
    appId: "1:980401304540:web:ec75a3c4ad2403fdc2d519",
    measurementId: "G-3WSSFXY9GR"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };

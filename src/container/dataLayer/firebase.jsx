import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpgaE0gvoSzukTfwyHg_9rZx8awCvJHLo",
  authDomain: "clone-4a38c.firebaseapp.com",
  projectId: "clone-4a38c",
  storageBucket: "clone-4a38c.appspot.com",
  messagingSenderId: "878518308254",
  appId: "1:878518308254:web:0c153dbd468acfe3235a8f",
  measurementId: "G-9C0VN4BJDJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };

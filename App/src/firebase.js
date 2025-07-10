// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3-k9xuwzyTgB8vzfDnsvCgozM3UCuWcI",
  authDomain: "gauth-538a5.firebaseapp.com",
  projectId: "gauth-538a5",
  storageBucket: "gauth-538a5.firebasestorage.app",
  messagingSenderId: "8377456186",
  appId: "1:8377456186:web:c68c4022805353d048c703",
  measurementId: "G-S7T2PGF3P4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };

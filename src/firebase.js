// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCU939UMb5FnzHBOps1AcbgW3Qhm0lTy0",
  authDomain: "pentia-webdev.firebaseapp.com",
  projectId: "pentia-webdev",
  storageBucket: "pentia-webdev.firebasestorage.app",
  messagingSenderId: "159534191107",
  appId: "1:159534191107:web:1b26e9cba803f625e4b436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
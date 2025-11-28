// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0onV4_sRVCDFUpa7kRCcZWhIr7vp9a9E",
  authDomain: "e09-firebase-todos.firebaseapp.com",
  projectId: "e09-firebase-todos",
  storageBucket: "e09-firebase-todos.firebasestorage.app",
  messagingSenderId: "669364638318",
  appId: "1:669364638318:web:2e361e6af0532f04f64c7f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
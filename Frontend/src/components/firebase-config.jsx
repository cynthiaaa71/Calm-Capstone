// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2toWOc7LXzQe1Kp46RKNCeZdJa869Vv4",
  authDomain: "mentalcheck-2a007.firebaseapp.com",
  projectId: "mentalcheck-2a007",
  storageBucket: "mentalcheck-2a007.appspot.com",
  messagingSenderId: "779270998218",
  appId: "1:779270998218:web:18b1ba84f44f41d5d54c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)



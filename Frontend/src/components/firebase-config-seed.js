// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


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
// Initialize Firebase app and Firestore instance
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };



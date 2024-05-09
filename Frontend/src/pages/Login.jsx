import React from "react";
import { auth } from "../components/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const db = getFirestore();  // Initialize Firestore

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Set authentication in local storage
        localStorage.setItem("isAuth", true);
        setIsAuth(true);

        // Get user info from the result
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        // Check if user already exists in Firestore
        if (!userDoc.exists()) {
          // If not, create a new user document
          await setDoc(userDocRef, {
            uid: user.uid,
            firstName: user.displayName.split(" ")[0],  // Assuming the first part is the first name
            lastName: user.displayName.split(" ")[1] || "",  // Assuming the second part is the last name
            email: user.email,
            // Add additional fields here
          });
        }

        // Navigate to home page
        navigate("/");
      })
      .catch((error) => {
        // Handle sign-in errors here
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;

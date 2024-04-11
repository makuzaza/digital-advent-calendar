import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "digital-calendar-team1.firebaseapp.com",
  projectId: "digital-calendar-team1",
  storageBucket: "digital-calendar-team1.appspot.com",
  messagingSenderId: "328666598634",
  appId: "1:328666598634:web:16a767808f68318c6a1b93",
  measurementId: "G-VMCR61JVTD",
};

initializeApp(firebaseConfig);

const auth = getAuth();

const loginWithEmailAndPassword = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // Access user token
      user.getIdToken().then(function (token) {
        // Send token to backend
        sendTokenToBackend(token);
      });
    })
    .catch((error) => {
      console.error(error.message, error.code);
    });
};

function sendTokenToBackend(token: string) {
  // Make an HTTP request to your backend using Axios
  axios
    .post("https://localhost:8000/authenticate", { token: token })
    .then((response) => {
      // Handle successful response from backend if needed
      console.log(response);
    })
    .catch((error) => {
      console.error("Error sending token to backend:", error);
    });
}

const logout = () => auth.signOut();

export { auth, loginWithEmailAndPassword, logout };

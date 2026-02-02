import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "digital-calendar-dev.firebaseapp.com",
  projectId: "digital-calendar-dev",
  storageBucket: "digital-calendar-dev.firebasestorage.app",
  messagingSenderId: "9280650989",
  appId: "1:9280650989:web:08ba75362778e7ee3256e4",
  measurementId: "G-Q5KF911ZYN"
};

initializeApp(firebaseConfig);

const auth = getAuth();

// Log in with email and password and return the token
const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const tokenId = await user.getIdToken();
    return { tokenId, uid: user.uid }; // Return the token and the uid
  } catch (error) {
    // console.error((error as Error).message);
    return { tokenId: "", uid: "" }; // Return an object with empty string values if there's an error
  }
};

const logout = () => auth.signOut();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(); // Initialize Firebase Storage

export { auth, loginWithEmailAndPassword, logout, db, storage, getAuth };

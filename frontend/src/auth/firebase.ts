import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert((error as Error).message);
  }
};

const logout = () => auth.signOut();

export { auth, loginWithEmailAndPassword, logout };

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBS_dSNCUkmjVHf2XlWOiyjSVjJDHRrh9U",
    authDomain: "digital-calendar-team1.firebaseapp.com",
    projectId: "digital-calendar-team1",
    storageBucket: "digital-calendar-team1.appspot.com",
    messagingSenderId: "328666598634",
    appId: "1:328666598634:web:16a767808f68318c6a1b93",
    measurementId: "G-VMCR61JVTD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Config loaded", db);

export default db;

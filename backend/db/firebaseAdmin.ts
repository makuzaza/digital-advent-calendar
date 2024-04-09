import * as admin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// connect to firebase
function firebase() {
  const db = admin.database();

  // console.log(admin);
  // console.log(db);
  console.log("Connected to Firebase");

  return db;
}

export default firebase;

export const auth = admin.auth();
export const firestore = admin.firestore();

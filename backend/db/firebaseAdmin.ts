import * as admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// connect to firebase
function firebase() {
  const db = admin.database();
  console.log("Connected to Firebase");
  return db;
}

export default firebase;

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export const bucket = storage.bucket();

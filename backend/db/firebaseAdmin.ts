import * as admin from "firebase-admin";
import dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config();

// Load service account from file
const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

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

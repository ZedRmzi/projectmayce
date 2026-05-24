import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace these placeholder values with your Firebase project config.
// Find them at: Firebase Console → Project Settings → Your apps → SDK setup
// Note: Firebase config is safe to be public — security is enforced via Firebase Security Rules.
const firebaseConfig = {
  apiKey: "AIzaSyDv3ng70xHbVNJVFU8cDtU_getWqPl5Cko",
  authDomain: "projectmayce-ae7e7.firebaseapp.com",
  projectId: "projectmayce-ae7e7",
  storageBucket: "projectmayce-ae7e7.firebasestorage.app",
  messagingSenderId: "358067359200",
  appId: "1:358067359200:web:6c49cc905c854d56d6af85",
  measurementId: "G-5HEW957GK4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

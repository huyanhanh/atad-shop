import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD1s7n3ScdvT-lh-P0sgrNnSDfRQaMxHDU",
  authDomain: "jwt-punk.firebaseapp.com",
  projectId: "jwt-punk",
  storageBucket: "jwt-punk.appspot.com",
  messagingSenderId: "869874732295",
  appId: "1:869874732295:web:bfd39f76e05abfd4a949a2",
  measurementId: "G-1S0R9QY84L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
const analytics = getAnalytics(app);


export default app
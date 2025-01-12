import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDSSZURo40J9tPvfSpvMI1lY4WVf7Va44",
  authDomain: "beaura-1c358.firebaseapp.com",
  projectId: "beaura-1c358",
  storageBucket: "beaura-1c358.firebasestorage.app",
  messagingSenderId: "368373972355",
  appId: "1:368373972355:web:ba56d49c6b5dd8936fcab6",
  measurementId: "G-74W7NSDJES",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

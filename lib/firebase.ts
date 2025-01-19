import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDSSZURo40J9tPvfSpvMI1lY4WVf7Va44",
    authDomain: "beaura-1c358.firebaseapp.com",
    projectId: "beaura-1c358",
    storageBucket: "beaura-1c358.firebasestorage.app",
    messagingSenderId: "368373972355",
    appId: "1:368373972355:web:ba56d49c6b5dd8936fcab6",
    measurementId: "G-74W7NSDJES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<string> => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    return idToken;
}

export const analytics = getAnalytics(app);

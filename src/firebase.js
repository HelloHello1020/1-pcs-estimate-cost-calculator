// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYHd5F36fUPVf3bQkwUe78cISl-MWzwmQ",
    authDomain: "analyze-user-usage.firebaseapp.com",
    projectId: "analyze-user-usage",
    storageBucket: "analyze-user-usage.firebasestorage.app",
    messagingSenderId: "1077660208707",
    appId: "1:1077660208707:web:9b7e83d615df77e1b9cef6",
    measurementId: "G-V5R3XCMV06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

export { db };

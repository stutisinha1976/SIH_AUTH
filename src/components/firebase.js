// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA_l3vnbd7O6mcNalp88ELf5ugw8KhymM",
  authDomain: "sih-auth-62d2a.firebaseapp.com",
  projectId: "sih-auth-62d2a",
  storageBucket: "sih-auth-62d2a.firebasestorage.app",
  messagingSenderId: "467208351335",
  appId: "1:467208351335:web:dfc7dcc680f41cae31eec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
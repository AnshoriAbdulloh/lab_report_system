import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOh2C76EsBvGjMBRG8a-TRCx1yZFYT_-g",
  authDomain: "lab-report-system-702c2.firebaseapp.com",
  projectId: "lab-report-system-702c2",
  storageBucket: "lab-report-system-702c2.firebasestorage.app",
  messagingSenderId: "939349398842",
  appId: "1:939349398842:web:be93057fb597c5ae6f2c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore instance
export const db = getFirestore(app);

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAewlpm_X0qQDV2L15UHm8228B5kT5qRB4",
  authDomain: "project-kisan-cd532.firebaseapp.com",
  projectId: "project-kisan-cd532",
  storageBucket: "project-kisan-cd532.appspot.com",
  messagingSenderId: "255730156408",
  appId: "1:255730156408:web:e9915e6f8203ce50107e8d",
  measurementId: "G-BPY4SVKMBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

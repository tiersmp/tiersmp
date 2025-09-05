
// Import des SDK Firebase (CDN modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuration Firebase (infos utilisateur)
const firebaseConfig = {
  apiKey: "AIzaSyAwJAQkQhXfurpcX681wjDEoIRql-Ms0MY",
  authDomain: "smptier.firebaseapp.com",
  projectId: "smptier",
  storageBucket: "smptier.firebasestorage.app",
  messagingSenderId: "235839720573",
  appId: "1:235839720573:web:dbe49be77b36ddd80fb514",
  measurementId: "G-2FTET163LJ"
};

// Init Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

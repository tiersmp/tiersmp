// firebase-init.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAwJAQkQhXfurpcX681wjDEoIRql-Ms0MY",
  authDomain: "smptier.firebaseapp.com",
  projectId: "smptier",
  storageBucket: "smptier.firebasestorage.app",
  messagingSenderId: "235839720573",
  appId: "1:235839720573:web:dbe49be77b36ddd80fb514",
  measurementId: "G-2FTET163LJ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

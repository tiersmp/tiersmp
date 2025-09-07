import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwJAQkQhXfurpcX681wjDEoIRql-Ms0MY",
  authDomain: "smptier.firebaseapp.com",
  projectId: "smptier",
  storageBucket: "smptier.firebasestorage.app",
  messagingSenderId: "235839720573",
  appId: "1:235839720573:web:dbe49be77b36ddd80fb514",
  measurementId: "G-2FTET163LJ"
};

// Initialisation des services Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Initialiser Analytics uniquement côté client en production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    import('firebase/analytics')
      .then(({ getAnalytics }) => {
        getAnalytics(app);
      })
      .catch(error => {
        console.warn('Firebase Analytics n\'a pas pu être chargé :', error);
      });
  }
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Firebase :', error);
  throw new Error('Impossible d\'initialiser Firebase. Vérifiez votre configuration.');
}

export { app, db, auth };

// Types pour les collections Firestore
export const COLLECTIONS = {
  SMP_QUEUE: 'smp_queue',
  SMP_PUBLIC: 'smp_public'
} as const;

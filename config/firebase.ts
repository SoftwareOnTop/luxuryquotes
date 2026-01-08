import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, type Auth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Instructions:
// 1. Go to Firebase Console > Project Settings > General > Your Apps
// 2. Register a Web App (it handles React Native JS well)
// 3. Copy the config object below replacing the placeholders
const firebaseConfig = {
  apiKey: "AIzaSyBVtAUBuI6XBbbgJTJH01Sb4GVg2U1ZJ3I",
  authDomain: "motivationquotesapp-e4b7f.firebaseapp.com",
  projectId: "motivationquotesapp-e4b7f",
  storageBucket: "motivationquotesapp-e4b7f.firebasestorage.app",
  messagingSenderId: "963320354752",
  appId: "1:963320354752:web:7c5fac9bbf8003610e1a25"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }

  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

export { db, auth };
export default app;

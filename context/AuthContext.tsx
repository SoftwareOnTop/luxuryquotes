import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

type UserSettings = {
  language: 'en' | 'fr' | 'it' | 'es' | 'de';
  theme: 'signet-ring-gold' | 'midnight-velvet' | 'marble-white';
  notifications: boolean;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  patronageStatus: 'basic' | 'patron';
  settings: UserSettings;
  likedQuotes: string[];
  streak: number;
  lastLoginDate: string | null;
};

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
  toggleLikeQuote: (quoteId: string) => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const DEFAULT_SETTINGS: UserSettings = {
  language: 'en',
  theme: 'signet-ring-gold',
  notifications: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Subscribe to user's firestore document
        const userRef = doc(db, 'users', currentUser.uid);
        
        const unsubscribeSnapshot = onSnapshot(userRef, async (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Create default profile if not exists
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              patronageStatus: 'basic',
              settings: DEFAULT_SETTINGS,
              likedQuotes: [],
              streak: 0,
              lastLoginDate: new Date().toISOString(),
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const toggleLikeQuote = async (quoteId: string) => {
    if (!user || !userProfile) return;
    
    const isLiked = userProfile.likedQuotes.includes(quoteId);
    let newLikedQuotes = [...userProfile.likedQuotes];
    
    if (isLiked) {
      newLikedQuotes = newLikedQuotes.filter(id => id !== quoteId);
    } else {
      newLikedQuotes.push(quoteId);
    }

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { likedQuotes: newLikedQuotes }, { merge: true });
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user || !userProfile) return;

    const updatedSettings = { ...userProfile.settings, ...newSettings };
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { settings: updatedSettings }, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      signIn, 
      signUp, 
      logOut,
      toggleLikeQuote,
      updateSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

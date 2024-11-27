"use client";
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "./firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Check if user exists in Firestore
      const userRef = doc(db, "user", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          name: user.displayName,
        });
        const cartCollectionRef = collection(userRef, "cart");
        const cartRef = doc(cartCollectionRef, "active");
        await setDoc(cartRef, {
          userId: user.uid,
          items: [],
        });
      }
      setUser(user);
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };
  return { user, signIn, signOut };
}

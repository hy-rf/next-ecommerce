"use client";
import { useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLinkAccount() {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      if (!user) return;
      await linkWithCredential(user, credential);
      toast.success("Account linked successfully");
    } catch {
      toast.error("Error linking account");
    }
  }

  async function handleSignInWithEmail() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully");
    } catch {
      toast.error("Error signing in");
    }
  }
  return (
    <>
      <h1>Authentication</h1>
      {user && <button onClick={signOut}>Sign Out</button>}
      {!user && <button onClick={signIn}>Sign In with Google</button>}
      {user && (
        <>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLinkAccount}>
            Link with email and password
          </button>
        </>
      )}
      {!user && (
        <>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignInWithEmail}>
            Sign in with email and password
          </button>
        </>
      )}
    </>
  );
}

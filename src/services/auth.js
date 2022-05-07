import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const signupRequest = async (email, password, name) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return await setDoc(doc(db, "users", user.uid), { email, name });
};

export const signInRequest = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutRequest = async () => {
  return await signOut(auth);
};

export const updateUserRequest = async (user, dataUser) => {
  await updateDoc(doc(db, "users", user.uid), { ...dataUser });
};

export const resetPasswordRequest = (email) => sendPasswordResetEmail(auth, email);

export const loginWithGoogleRequest = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

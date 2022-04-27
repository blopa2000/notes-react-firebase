import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const context = createContext();

//HOOK
export const useAuth = () => useContext(context);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const res = await getDoc(doc(db, "users", currentUser.uid));
        setUser({
          uid: currentUser.uid,
          ...res.data(),
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return await setDoc(doc(db, "users", user.uid), { email, name });
  };

  const login = (email, passwork) => signInWithEmailAndPassword(auth, email, passwork);

  const logout = () => signOut(auth);

  return (
    <context.Provider value={{ user, login, loading, logout, signup }}>{children}</context.Provider>
  );
};

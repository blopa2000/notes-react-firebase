import { useContext, createContext, useState, useEffect, useReducer } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Reducers, initialState } from "./Reducers";
import { signInRequest, signupRequest, signOutRequest } from "../services/auth";
import { getNotasRequest, deleteNoteRequest } from "../services/notes";

const context = createContext();

//HOOK
export const useGlobalContext = () => useContext(context);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducers, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const res = await getDoc(doc(db, "users", currentUser.uid));
        dispatch({
          type: "ADD_USER",
          payload: {
            uid: currentUser.uid,
            ...res.data(),
          },
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (!state.user) return;
      const res = await getNotasRequest(state.user);
      getNotes(res);
    })();
  }, [state.user]);

  /**
   * NOTES
   * @param {*} payload
   */

  const getNotes = (payload) => {
    dispatch({ type: "GET_NOTES", payload });
  };

  const addNote = async () => {
    setLoading(true);
    const res = await getNotasRequest(state.user);
    getNotes(res);
    setLoading(false);
  };

  const deleteNote = async (noteId) => {
    const res = await deleteNoteRequest(state.user, noteId);
    if (res) {
      dispatch({ type: "DELETE_NOTE", payload: noteId });
    } else {
      //error
    }
  };

  /**
   * USER
   * @param {*} email
   * @param {*} passwod
   * @param {*} name
   * @returns
   */

  const signup = (email, passwod, name) => signupRequest(email, passwod, name);

  const login = (email, passwork) => signInRequest(email, passwork);

  const logout = () => {
    dispatch({ type: "DELETE_USER" });
    signOutRequest();
  };

  const Account = {
    signup,
    login,
    logout,
  };

  const Notes = {
    addNote,
    deleteNote,
  };

  return (
    <context.Provider value={{ ...state, loading, ...Account, ...Notes }}>
      {children}
    </context.Provider>
  );
};

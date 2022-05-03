import { useContext, createContext, useState, useEffect, useReducer, useCallback } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Reducers, initialState } from "./Reducers";
import { signInRequest, signupRequest, signOutRequest } from "../services/auth";
import {
  getNotasRequest,
  deleteNoteRequest,
  addNoteRequest,
  updateNoteRequest,
} from "../services/notes";

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

  const addNote = async (title, content) => {
    setLoading(true);
    const newNote = await addNoteRequest(state.user, title, content);

    if (newNote) {
      const res = await getNotasRequest(state.user);
      getNotes(res);
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      return false;
    }
  };

  const deleteNote = async (noteId) => {
    const res = await deleteNoteRequest(state.user, noteId);
    if (res) {
      dispatch({ type: "DELETE_NOTE", payload: noteId });
    } else {
      //error
    }
  };

  const noteColor = async (noteId, typeColor) => {
    const res = await updateNoteRequest(state.user, noteId, typeColor);

    if (res) {
      dispatch({ type: "COLOR_NOTE", payload: { noteId, typeColor } });
    }
    return res;
  };

  const updateNote = async (noteId, data) => {
    setLoading(true);
    const resUpdateNote = await updateNoteRequest(state.user, noteId, data, true);
    if (resUpdateNote) {
      const res = await getNotasRequest(state.user);
      getNotes(res);
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      return false;
    }
  };

  const selectNote = (payload) => {
    dispatch({
      type: "SELECT_NOTE",
      payload,
    });
  };

  const CleanSelectNote = useCallback(() => {
    dispatch({
      type: "CLEAN_SELECT_NOTE",
    });
  }, []);

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
    dispatch({ type: "CLEAN_STATE" });
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
    noteColor,
    selectNote,
    CleanSelectNote,
    updateNote,
  };

  return (
    <context.Provider value={{ ...state, loading, setLoading, ...Account, ...Notes }}>
      {children}
    </context.Provider>
  );
};

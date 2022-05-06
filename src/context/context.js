import { useContext, createContext, useState, useEffect, useReducer, useCallback } from "react";
import { Reducers, initialState } from "./Reducers";

import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import {
  signInRequest,
  signupRequest,
  signOutRequest,
  updateUserRequest,
  resetPasswordRequest,
  loginWithGoogleRequest,
} from "../services/auth";
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
        if (res.exists()) {
          dispatch({
            type: "ADD_USER",
            payload: {
              uid: currentUser.uid,
              ...res.data(),
            },
          });
        } else {
          logout();
        }
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
    try {
      await addNoteRequest(state.user, title, content);
      const res = await getNotasRequest(state.user);
      getNotes(res);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    const res = await deleteNoteRequest(state.user, noteId);
    if (res) {
      dispatch({ type: "DELETE_NOTE", payload: noteId });
    }
    return res;
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
    try {
      await updateNoteRequest(state.user, noteId, data, true);
      const res = await getNotasRequest(state.user);
      getNotes(res);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
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

  const signup = async (email, passwod, name) => {
    try {
      await signupRequest(email, passwod, name);
      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (email, passwork) => {
    try {
      await signInRequest(email, passwork);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: "CLEAN_STATE" });
    signOutRequest();
  };

  const updateUser = async (data) => {
    setLoading(true);
    try {
      await updateUserRequest(state.user, data);
      dispatch({ type: "UPDATE_USER", payload: data });
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = (email) => {
    try {
      resetPasswordRequest(email);
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogleRequest();
      const user = await getDoc(doc(db, "users", res.user.uid));
      if (!user.exists()) return false;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const Account = {
    signup,
    login,
    logout,
    updateUser,
    resetPassword,
    loginWithGoogle,
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

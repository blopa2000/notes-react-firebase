import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  collection,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const getNotesRequest = async (user) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users", user.uid, "notes"), orderBy("timestamp", "desc"))
    );
    const auxNotes = [];
    await querySnapshot.forEach((doc) => {
      const date = transformTimestamp(doc.data().timestamp);
      auxNotes.push({
        noteId: doc.id,
        ...doc.data(),
        date,
      });
    });

    return auxNotes;
  } catch (error) {
    console.error(error);
  }
};

export const getNoteRequest = async (user, noteId) => {
  try {
    return await getDoc(doc(db, "users", user.uid, "notes", noteId));
  } catch (error) {
    console.error(error);
  }
};

export const addNoteRequest = async (user, title, content) => {
  try {
    await addDoc(collection(db, "users", user.uid, "notes"), {
      title,
      content,
      creationDate: Timestamp.now(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteNoteRequest = async (user, noteId) => {
  try {
    await deleteDoc(doc(db, "users", user.uid, "notes", noteId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateNoteRequest = async (user, noteId, data, timestamp = false) => {
  try {
    if (timestamp) data.timestamp = serverTimestamp();
    await updateDoc(doc(db, "users", user.uid, "notes", noteId), {
      ...data,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const transformTimestamp = (timestamp) => {
  const date = timestamp.toDate().toString().split(" ");
  return date[1] + " " + date[2] + " " + date[3];
};

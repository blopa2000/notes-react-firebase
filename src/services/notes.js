import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const getNotasRequest = async (user) => {
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
    console.log(error);
  }
};

export const addNoteRequest = async (user, title, content) => {
  try {
    await addDoc(collection(db, "users", user.uid, "notes"), {
      title: title.value,
      content: content.value,
      creationDate: Timestamp.now(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteNoteRequest = async (user, noteId) => {
  try {
    await deleteDoc(doc(db, "users", user.uid, "notes", noteId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const colorNoteRequest = async (user, noteId, typeColor) => {
  try {
    await updateDoc(doc(db, "users", user.uid, "notes", noteId), {
      bgColor: typeColor.bgColor,
      textColor: typeColor.textColor,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const transformTimestamp = (timestamp) => {
  const date = timestamp.toDate().toString().split(" ");
  return date[1] + " " + date[2] + " " + date[3];
};

import { useEffect, useState, Suspense } from "react";
import { useAuth } from "../context/context";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import Masonry from "react-masonry-css";

import { Form } from "../components/Form";
import { Note } from "../components/Note";

import "../styles/home.scss";

const Colums = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "users", user.uid, "notes"), orderBy("timestamp", "desc"))
        );
        const auxNotes = [];
        querySnapshot.forEach((doc) => {
          if (auxNotes.find((note) => auxNotes.id === doc.id)) return;
          const timestamp = doc.data().timestamp.toDate().toString().split(" ");
          const date = timestamp[1] + " " + timestamp[2] + " " + timestamp[3];
          auxNotes.push({
            noteId: doc.id,
            ...doc.data(),
            date,
          });
        });
        setNotes(auxNotes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return (
    <>
      <div className="container-home ">
        <Form />
        {notes.length === 0 && <div>no tienes notas agrega una</div>}
        <Masonry
          breakpointCols={Colums}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note, index) => (
            <Note
              key={index}
              noteId={note.noteId}
              title={note.title}
              content={note.content}
              date={note.date}
            />
          ))}
        </Masonry>
      </div>
    </>
  );
};

export { Home };

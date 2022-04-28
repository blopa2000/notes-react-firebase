import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";

import Masonry from "react-masonry-css";

import { Note } from "../components/Note";

import "../styles/home.scss";

const Colums = {
  default: 8,
  2560: 7,
  2325: 6,
  1900: 5,
  1770: 4,
  1250: 3,
  940: 2,
  645: 1,
};

const Home = () => {
  const { notes } = useGlobalContext();

  return (
    <>
      <div className="container-home ">
        <Link to="/add">add new note</Link>
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

import { MdDeleteForever, MdOutlineImage, MdOutlineColorLens } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import "../styles/note.scss";

const Note = ({ noteId, title, content, date }) => {
  const { deleteNote } = useGlobalContext();
  return (
    <>
      <div className="content-card-note">
        <div className="card-note">
          <header className="content-card-title">
            <h1 className="content-card-note-title">{title}</h1>
            <p className="contente-card-note-date">{date}</p>
          </header>
          <div className="content-card-note-content">{content}</div>
        </div>

        <div className="content-card-icons">
          <button>
            <MdOutlineImage />
          </button>
          <button>
            <MdOutlineColorLens />
          </button>
          <button onClick={() => deleteNote(noteId)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </>
  );
};

export { Note };

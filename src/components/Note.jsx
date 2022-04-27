import "../styles/note.scss";

const Note = ({ noteId, title, content, date }) => {
  return (
    <>
      <div className="content-card-note">
        <div className="card-note">
          <header className="content-card-title">
            <h1 className="content-card-note-title">{title}</h1>
            <p className="contente-card-note-date">{date}</p>
          </header>
          <div>{content}</div>
        </div>

        <div className="content-card-icons">
          <div>color</div>
          <div>img</div>
          <div>eliminar</div>
        </div>
      </div>
    </>
  );
};

export { Note };

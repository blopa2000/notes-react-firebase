import "../styles/note.scss";

const Note = () => {
  return (
    <>
      <div className="content-card-note">
        <div className="card-note">
          <header className="content-card-title">
            <h1 className="content-card-note-title">New Note</h1>
            <p className="contente-card-note-date">23 july 2022</p>
          </header>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, ullam.</li>
            </ul>
          </div>
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

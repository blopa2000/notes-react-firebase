import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect } from "react";

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
  const { notes, CleanSelectNote } = useGlobalContext();

  useEffect(() => {
    CleanSelectNote();
  }, [CleanSelectNote]);

  return (
    <>
      <div className="container-home ">
        <div className="link">
          <Link to="/add" className="container-home-link-add-note">
            <span id="span1" />
            <span id="span2" />
            <span id="span3" />
            <span id="span4" />
            <div className="content-link">
              <IoMdAddCircle />
              <p>add new note</p>
            </div>
          </Link>
        </div>
        {notes.length === 0 && <div>no tienes notas agrega una</div>}
        <Masonry
          breakpointCols={Colums}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note, index) => (
            <Note key={index} note={note} />
          ))}
        </Masonry>
      </div>
    </>
  );
};

export { Home };

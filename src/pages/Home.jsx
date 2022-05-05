import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { IoMdAddCircle } from "react-icons/io";
import Masonry from "react-masonry-css";

import { Note } from "../components/Note";
import { Button } from "../components/Button";

import img from "../utils/images/note.svg";

const Colums = {
  default: 8,
  2650: 7,
  2325: 6,
  2050: 5,
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
      <div className="container-home">
        <div className="container-home-activities">
          <Link to="/add">
            <Button>
              <IoMdAddCircle />
              <p>add new note</p>
            </Button>
          </Link>
        </div>
        {notes.length === 0 && (
          <div className="container-home-message">
            <h1>You don't have a note, why not add one?</h1>
            <img src={img} alt="" />
          </div>
        )}

        <Masonry
          breakpointCols={Colums}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
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

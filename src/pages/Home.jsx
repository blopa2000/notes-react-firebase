import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Masonry from "react-masonry-css";

import { Note } from "../components/Note";
import { Button } from "../components/Button";

import img from "../utils/images/note.svg";
import notSearch from "../utils/images/not-search.svg";

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
  const [searchNote, setSearchNote] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    CleanSelectNote();
  }, [CleanSelectNote]);

  useEffect(() => {
    setSearchNote(
      notes.filter((note) => {
        const todoText = note.title.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      })
    );
  }, [notes, searchValue]);

  return (
    <>
      <div className="container-home">
        <div className="container-home-activities">
          <div className="container-home-activities-search">
            <FaSearch className="container-home-activities-search-icon" />
            <input
              className="container-home-activities-search-input"
              type="text"
              placeholder="Note title"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
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
            <img className="image-of-the-void " src={img} alt="add new note" />
          </div>
        )}

        {searchValue.length > 0 && searchNote.length === 0 && notes.length > 0 && (
          <div className="container-home-not-search">
            <h1 className="container-home-not-search-title">no se encuentra la nota</h1>
            <img className="image-of-the-void " src={notSearch} alt="not-search" />
          </div>
        )}

        <Masonry
          breakpointCols={Colums}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {searchNote.map((note, index) => (
            <Note key={index} note={note} />
          ))}
        </Masonry>
      </div>
    </>
  );
};

export { Home };

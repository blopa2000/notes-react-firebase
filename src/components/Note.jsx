import React, { useRef, useState } from "react";
import { MdDeleteForever, MdOutlineImage, MdOutlineColorLens } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import { useOuterClick } from "../hooks/useOuterClick";

import { Popover } from "./Popover";

import "../styles/note.scss";

const Note = ({ noteId, title, content, date, bgColor, textColor }) => {
  const { deleteNote, noteColor } = useGlobalContext();
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useOuterClick((e) => setActive(false), ref);

  const handleSelectColor = async (TypeColor) => {
    const res = await noteColor(noteId, TypeColor);
    if (res) {
      setActive(false);
    }
  };

  return (
    <div className="content-card" ref={ref}>
      <div className="content-card-note" style={bgColor ? { background: bgColor } : {}}>
        <div className="card-note" style={textColor ? { color: textColor } : {}}>
          <header className="content-card-title">
            <h1 className="content-card-note-title">{title}</h1>
            <p className="contente-card-note-date">{date}</p>
          </header>
          <div className="content-card-note-content">{content}</div>
        </div>

        <div className="content-card-icons" style={active ? { opacity: 1 } : {}}>
          <button>
            <MdOutlineImage />
          </button>
          <button onClick={() => setActive(!active)}>
            <MdOutlineColorLens />
          </button>
          <button onClick={() => deleteNote(noteId)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
      {active && <Popover bgColor={bgColor} handleSelectColor={handleSelectColor} />}
    </div>
  );
};

export { Note };

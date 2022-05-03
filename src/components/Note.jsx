import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdOutlineColorLens } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import { useOuterClick } from "../hooks/useOuterClick";

import { Popover } from "./Popover";

import "../styles/note.scss";

const Note = ({ note }) => {
  const { noteId, title, content, date, bgColor, textColor } = note;
  const { deleteNote, noteColor, selectNote } = useGlobalContext();
  const navigate = useNavigate();
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
      <div
        className="content-card-note"
        style={bgColor ? { background: bgColor } : {}}
        onClick={(e) => {
          selectNote({ title, content, noteId });
          navigate("/edit");
        }}
      >
        <div className="card-note" style={textColor ? { color: textColor } : {}}>
          <header className="content-card-title">
            <h1 className="content-card-note-title">{title}</h1>
            <p className="contente-card-note-date">{date}</p>
          </header>
          <div
            className="content-card-note-content"
            onClick={(e) => (e.target.tagName === "A" ? e.stopPropagation() : null)}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div className="content-card-icons" style={active ? { opacity: 1 } : {}}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActive(!active);
            }}
          >
            <MdOutlineColorLens />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(noteId);
            }}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
      {active && <Popover bgColor={bgColor} handleSelectColor={handleSelectColor} />}
    </div>
  );
};

export { Note };

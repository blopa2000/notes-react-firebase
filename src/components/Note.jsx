import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useOuterClick } from "../hooks/useOuterClick";

import { MdDeleteForever, MdOutlineColorLens } from "react-icons/md";

import { Popover } from "./Popover";

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
    <div className="container-card" ref={ref}>
      <div
        className="container-card-content"
        style={bgColor ? { background: bgColor } : {}}
        onClick={(e) => {
          selectNote({ title, content, noteId });
          navigate("/edit");
        }}
      >
        <div className="container-card-content-note " style={textColor ? { color: textColor } : {}}>
          <header className="container-card-content-note-head">
            <h1 className="note-title">{title}</h1>
            <p className="note-date">{date}</p>
          </header>
          <div
            className={`container-card-content-note-body ${
              bgColor === "#a088cc" || bgColor === "#cc88c4" ? "table" : ""
            }`}
            onClick={(e) => (e.target.tagName === "A" ? e.stopPropagation() : null)}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div className="container-card-content-icons" style={active ? { opacity: 1 } : {}}>
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

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useOuterClick } from "../hooks/useOuterClick";

import ReactJsAlert from "reactjs-alert";
import { MdDeleteForever, MdOutlineColorLens } from "react-icons/md";

import { Popover } from "./Popover";
import { Modal } from "./Modal";

const Note = ({ note }) => {
  const { noteId, title, content, date, bgColor, textColor } = note;
  const { deleteNote, noteColor, selectNote } = useGlobalContext();
  const [activePalette, setActivePalette] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [openAlert, setOpenAlert] = useState({
    status: false,
    title: "",
    type: "",
  });

  const navigate = useNavigate();
  const ref = useRef(null);

  useOuterClick((e) => setActivePalette(false), ref);

  const handleSelectColor = async (TypeColor) => {
    const res = await noteColor(noteId, TypeColor);
    if (!res) {
      setOpenAlert({
        status: true,
        title: "Error when trying to change the color of a note",
        type: "error",
      });
    }
    setActivePalette(false);
  };

  const handleDeleteNote = async (e) => {
    e.stopPropagation();
    const res = await deleteNote(noteId);
    if (!res) {
      setOpenAlert({
        status: true,
        title: "Error when trying to delete a note",
        type: "error",
      });
    }
    setIsOpenModal(false);
  };

  const handleIsOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className="container-card" ref={ref}>
        <div
          className="container-card-content"
          style={bgColor ? { background: bgColor } : {}}
          onClick={(e) => {
            selectNote({ title, content, noteId });
            navigate("/edit");
          }}
        >
          <div
            className="container-card-content-note "
            style={textColor ? { color: textColor } : {}}
          >
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

          <div className="container-card-content-icons" style={activePalette ? { opacity: 1 } : {}}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePalette(!activePalette);
              }}
            >
              <MdOutlineColorLens />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenModal(true);
              }}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
        {activePalette && <Popover bgColor={bgColor} handleSelectColor={handleSelectColor} />}
      </div>
      <ReactJsAlert
        status={openAlert.status}
        type={openAlert.type}
        title={openAlert.title}
        Close={() => setOpenAlert({ ...openAlert, status: false })}
      />

      {isOpenModal && (
        <Modal handleIsOpenModal={handleIsOpenModal} title="Delete note">
          <div className="content-delete-note">
            <h3 className="content-delete-note-title">
              Are you sure you want to delete this note?
            </h3>

            <div className="content-btn">
              <button className="content-delete-note-btn btn-delete" onClick={handleDeleteNote}>
                Yes
              </button>

              <button className="content-delete-note-btn" onClick={handleIsOpenModal}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export { Note };

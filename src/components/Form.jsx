import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

import { KEYS } from "../keys";
import { configEditor } from "../constants";

import "../styles/form.scss";

const Form = () => {
  const navigate = useNavigate();
  const { addNote, selectNoteEdit } = useGlobalContext();
  const [content, setContent] = useState(selectNoteEdit.content);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { title } = e.target.elements;
      const res = await addNote(title, content);

      if (!res) throw new Error("Error al agregar la nota");

      navigate("/");
    } catch (error) {
      //errors are handled
      console.log(error);
    } finally {
      //with loading
    }
  };

  return (
    <div className="content-form">
      <div className="content-form-card">
        <form className="content-form-card-form " onSubmit={handleSave}>
          <header>
            <h1 className="content-form-card-title ">New Note</h1>
            <button type="submit">save</button>
          </header>
          <input type="text" placeholder="Title" name="title" className="content-form-card-input" />
          <div className="card">
            <Editor
              apiKey={KEYS}
              initialValue={selectNoteEdit.content}
              onEditorChange={(e) => setContent(e)}
              init={configEditor}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export { Form };

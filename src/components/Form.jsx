import { useGlobalContext } from "../context/context";
import { addNoteRequest } from "../services/notes";
import { useNavigate } from "react-router-dom";

import "../styles/form.scss";

const Form = () => {
  const navigate = useNavigate();
  const { user, addNote } = useGlobalContext();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { title, content } = e.target.elements;
      const res = await addNoteRequest(user, { title, content });

      if (!res) throw new Error("Error al agregar la nota");

      title.value = "";
      content.value = "";
      await addNote();
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
        <header>
          <h1 className="content-form-card-title ">New Note</h1>
        </header>
        <form className="content-form-card-form " onSubmit={handleSave}>
          <input type="text" placeholder="Title" name="title" className="content-form-card-input" />
          <textarea
            placeholder="Take a note..."
            name="content"
            className="content-form-card-textarea"
            rows={5}
          />
          <button type="submit">save</button>
        </form>
      </div>
    </div>
  );
};

export { Form };

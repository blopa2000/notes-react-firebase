import { useAuth } from "../context/context";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

import "../styles/form.scss";

const Form = () => {
  const { user } = useAuth();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { title, content } = e.target.elements;
      await addDoc(collection(db, "users", user.uid, "notes"), {
        title: title.value,
        content: content.value,
        creationDate: Timestamp.now(),
        timestamp: serverTimestamp(),
      });

      title.value = "";
      content.value = "";
    } catch (error) {
      //errors are handled
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

import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

import { KEYS } from "../keys";
import { configEditor } from "../constants";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import "../styles/form.scss";

const NoteForm = () => {
  const navigate = useNavigate();
  const { addNote, selectNoteEdit, updateNote } = useGlobalContext();
  const [content, setContent] = useState(selectNoteEdit.content);

  const handleSubmit = async (values, actions) => {
    try {
      if (selectNoteEdit.noteId) {
        const res = await updateNote(selectNoteEdit.noteId, { title: values.title, content });
        if (!res) throw new Error("Error when trying to update the note");
      } else {
        const res = await addNote(values.title, content);
        if (!res) throw new Error("Error adding note");
      }
      actions.setSubmitting(false);
      navigate("/");
    } catch (error) {
      //errors are handled
      console.log(error);
    }
  };

  return (
    <div className="content-form">
      <div className="content-form-card">
        <Formik
          initialValues={{
            title: selectNoteEdit.title,
          }}
          validationSchema={yup.object({
            title: yup.string().required("Title is required"),
          })}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form className="content-form-card-form " onSubmit={handleSubmit}>
              <header>
                <h1 className="content-form-card-title ">New Note</h1>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="container-home-link-add-note"
                >
                  <span id="span1" />
                  <span id="span2" />
                  <span id="span3" />
                  <span id="span4" />

                  <div className="content-link">{selectNoteEdit.noteId ? "Update" : "Save"}</div>
                </button>
              </header>

              <Field
                type="text"
                name="title"
                placeholder="title"
                className="content-form-card-input"
              />
              <ErrorMessage className="text-red-500 text-sm" name="title" component="div" />

              <div className="card">
                <Editor
                  apiKey={KEYS}
                  initialValue={selectNoteEdit.content}
                  onEditorChange={(e) => {
                    setContent(e);
                  }}
                  init={configEditor}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export { NoteForm };

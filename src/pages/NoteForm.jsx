import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";

import { KEYS } from "../keys";
import { configEditor } from "../constants";

import { Button } from "../components/Button";

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
    <div className="content-form-note">
      <div className="content-form-note-card">
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
            <Form className="form-control" onSubmit={handleSubmit}>
              <header className="form-control-header">
                <h1 className="form-control-header-title ">New Note</h1>
                <Button>
                  <p>{selectNoteEdit.noteId ? "Update" : "Save"}</p>
                </Button>
              </header>

              <Field type="text" name="title" placeholder="title" className="form-control-input" />
              <ErrorMessage className="form-control-message-error" name="title" component="div" />

              <div className="content-editor">
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

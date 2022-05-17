import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";
import ReactJsAlert from "reactjs-alert";

import { KEYS } from "../keys";
import { configEditor } from "../constants";

import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

const NoteForm = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { addNote, updateNote, getNote } = useGlobalContext();
  const [content, setContent] = useState("");
  const [initialDataNote, setInitialDataNote] = useState({
    title: "",
    content: "",
    noteId: "",
  });
  const [openAlert, setOpenAlert] = useState({
    status: false,
    title: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (noteId) {
      setIsLoading(true);
      (async () => {
        const res = await getNote(noteId);
        if (res.data()) {
          const data = {
            title: res.data().title,
            content: res.data().content,
            noteId: res.id,
          };
          setInitialDataNote(data);
          setContent(res.data().content);
          setIsLoading(false);
        } else {
          navigate("/");
        }
      })();
    }
  }, [noteId, getNote, navigate]);

  const handleSubmit = async (values, actions) => {
    try {
      if (noteId) {
        const res = await updateNote(initialDataNote.noteId, { title: values.title, content });
        if (!res) throw new Error("Error when trying to update the note");
      } else {
        const res = await addNote(values.title, content);
        if (!res) throw new Error("Error when trying to add a note");
      }
      actions.setSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error(openAlert);
      setOpenAlert({
        status: true,
        title: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="content-form-note">
        <div className="content-form-note-card">
          {isLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={{
                title: initialDataNote.title,
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
                    <Button type="submit">
                      <p>{noteId ? "Update" : "Save"}</p>
                    </Button>
                  </header>

                  <Field
                    type="text"
                    name="title"
                    placeholder="title"
                    className="form-control-input"
                  />
                  <ErrorMessage
                    className="form-control-message-error"
                    name="title"
                    component="div"
                  />

                  <div className="content-editor">
                    <Editor
                      apiKey={KEYS}
                      initialValue={initialDataNote.content}
                      onEditorChange={(e) => {
                        setContent(e);
                      }}
                      init={configEditor}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <ReactJsAlert
        status={openAlert.status}
        type={openAlert.type}
        title={openAlert.title}
        Close={() => setOpenAlert({ ...openAlert, status: false })}
      />
    </>
  );
};

export { NoteForm };

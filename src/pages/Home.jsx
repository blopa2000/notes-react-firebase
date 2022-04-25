import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { Form } from "../components/Form";
import { Note } from "../components/Note";

import "../styles/home.scss";

const Home = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      // if (!user) {
      //   window.location.href = "/login";
      // }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="container-home ">
        <Form />
        <Note />
      </div>
    </>
  );
};

export { Home };

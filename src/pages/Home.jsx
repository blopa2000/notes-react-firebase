import { Form } from "../components/Form";
import { Note } from "../components/Note";

import "../styles/home.scss";

const Home = () => {
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

import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/Button";

import notFound from "../utils/images/404.svg";

const Notfound = () => {
  return (
    <div className="content-not-found">
      <div>
        <h1 className="title">404</h1>
        <p>Page not found</p>
        <Link to="/">
          <Button className="btn">Go Home</Button>
        </Link>
      </div>
      <img className="image" src={notFound} alt="404" />
    </div>
  );
};

export { Notfound };

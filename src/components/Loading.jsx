import React from "react";

const Loading = () => {
  return (
    <div className="container-loading">
      <h1>loading</h1>
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export { Loading };

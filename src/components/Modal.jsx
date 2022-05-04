import ReactDOM from "react-dom";

import { GrClose } from "react-icons/gr";

import "../styles/modal.scss";

const Modal = ({ children, handleIsOpenModal }) => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2>Settings</h2>
            <button className="modal-close-btn" onClick={() => handleIsOpenModal()}>
              <GrClose />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export { Modal };

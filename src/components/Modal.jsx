import ReactDOM from "react-dom";

import { GrClose } from "react-icons/gr";

const Modal = ({ children, handleIsOpenModal, title }) => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2>{title}</h2>
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

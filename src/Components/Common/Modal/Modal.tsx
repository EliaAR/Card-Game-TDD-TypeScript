import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

interface ModalProps {
  onCloseModal: () => void;
  children: JSX.Element;
}

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

function Modal({ onCloseModal, children }: ModalProps) {
  return ReactDOM.createPortal(
    <div onClick={onCloseModal} data-testid="modal-overlay" className="modal">
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        {children}
        <button onClick={onCloseModal}>Cerrar</button>
      </div>
    </div>,
    modalRoot
  );
}

export { Modal };

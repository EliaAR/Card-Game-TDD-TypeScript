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
  const element = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  });

  return ReactDOM.createPortal(
    <div onClick={onCloseModal} data-testid="modal-overlay">
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={onCloseModal}>Cerrar</button>
      </div>
    </div>,
    element
  );
}

export { Modal };

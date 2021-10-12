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
        <div
          onClick={onCloseModal}
          role="button"
          aria-label="cerrar"
          className="modal__button"
        >
          <i className="fas fa-times-circle"></i>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export { Modal };

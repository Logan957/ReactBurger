import {
  FC,
  ReactNode,
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose, title }) => {
  const handleCloseModal = () => {
    if (onClose !== undefined) {
      onClose();
    }
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const handleDivClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const clickOverlay = useCallback(() => {
    handleCloseModal();
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay handleCloseModal={clickOverlay}>
      <div className={`${styles.modal}`} onClick={handleDivClick}>
        <div className="d-flex justify-content-between">
          <div className="text text_type_main-large">{title ?? ""}</div>
          <CloseIcon type="primary" onClick={handleCloseModal} />
        </div>
        <div className={`${styles.body}`}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
export default memo(Modal);

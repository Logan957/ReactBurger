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

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose, title }) => {
  const handleCloseModal = useCallback(() => {
    if (onClose !== undefined) {
      onClose();
    }
  }, []);

  const close = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [close]);

  const handleDivClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const clickOverlay = useCallback(() => {
    handleCloseModal();
  }, [handleCloseModal]);

  return ReactDOM.createPortal(
    <div onClick={clickOverlay} className={`${styles.modal_overlay}`}>
      <div className={`${styles.modal}`} onClick={handleDivClick}>
        <div className="d-flex justify-content-between">
          <div className="text text_type_main-large">{title ?? ""}</div>
          <CloseIcon type="primary" onClick={handleCloseModal} />
        </div>
        <div className={`${styles.body}`}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
export default memo(Modal);

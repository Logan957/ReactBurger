import React, { FC, ReactNode, memo } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  handleCloseModal,
  children,
}) => {
  const clickOverlay = () => {
    handleCloseModal();
  };

  return (
    <div onClick={clickOverlay} className={styles.modal_overlay}>
      {children}
    </div>
  );
};

export default memo(ModalOverlay);

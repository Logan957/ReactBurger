import React, { memo } from "react";
import styles from "./profile-order-details.module.css";
import OrderDetails from "../../../components/order-details/order-details";
const ProfileOrderDetailsPage: React.FC = () => {
  return (
    <div
      className={`${styles.container} ${styles.card} d-flex justify-content-center`}
    >
      <OrderDetails />
    </div>
  );
};

export default memo(ProfileOrderDetailsPage);

import React, { memo } from "react";
import OrderDetails from "../../components/order-details/order-details";
import styles from "./order-feed-details.module.css";
const OrderFeedDetailsPage: React.FC = () => {
  return (
    <div
      className={`${styles.container} ${styles.card} d-flex justify-content-center`}
    >
      <OrderDetails />
    </div>
  );
};

export default memo(OrderFeedDetailsPage);

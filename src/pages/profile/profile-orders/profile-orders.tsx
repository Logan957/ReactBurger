import React, { memo } from "react";
import NavBar from "../../../components/profile/nav-bar";
import styles from "./profile-orders.module.css";
import { useTypedSelector } from "../../../hooks/use-typed-selector";
import OrderCardDetails from "../../../components/order-card-details/order-card-details";

const ProfileOrdersPage: React.FC = () => {
  const { messages } = useTypedSelector((state) => state.orderHistory);

  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className={`${styles.content} d-flex justify-content-between`}>
          <NavBar />
          {messages !== null && (
            <div className={`${styles.feed_container} mt-15`}>
              {messages?.orders.map((x) => {
                return (
                  <div key={x.number}>
                    <OrderCardDetails order={x} isShowStatus={true} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ProfileOrdersPage);

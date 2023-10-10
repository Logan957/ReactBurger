import React, { memo, useEffect } from "react";
import NavBar from "../../../components/profile/nav-bar";
import styles from "./profile-orders.module.css";
import { useTypedSelector } from "../../../hooks/use-typed-selector";
import OrderCardDetails from "../../../components/order-card-details/order-card-details";
import { useWebSocket } from "../../../hooks/use-web-socket";
import { WSS_HISTORY_ORDER } from "../../../services/constants/constant";

const ProfileOrdersPage: React.FC = () => {
  const { messages } = useTypedSelector((state) => state.WS);
  const { connect, closeWs } = useWebSocket();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    connect(`${WSS_HISTORY_ORDER}?token=${token?.replace("Bearer ", "")}`);

    return () => {
      closeWs();
    };
  }, [token]);

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

import React, { memo } from "react";
import styles from "./order-detail.module.css";
import DoneIcon from "../../icons/done-icon";

const OrderDetails: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className="d-flex flex-column align-items-center">
        <p className={`${styles.shadow} mt-15 text text_type_digits-large`}>
          034536
        </p>
        <div className="mt-8 text_type_main-medium">индентификатор заказа</div>
        <div className="mt-15">
          <DoneIcon />
        </div>
        <div className="mt-15 text text_type_main-default">
          Ваш заказ начали готовить
        </div>
        <div className="mt-2 text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </div>
      </div>
    </div>
  );
};

export default memo(OrderDetails);
import React, { memo } from "react";
import styles from "./create-order-details.module.css";
import DoneIcon from "../../icons/done-icon";
import { useTypedSelector } from "../../../hooks/use-typed-selector";
import Loader from "../../loader/loader";

const CreateOrderDetails: React.FC = () => {
  const { createdOrder, createError, isCreateLoading } = useTypedSelector(
    (state) => state.order
  );

  return (
    <div className={styles.card}>
      {isCreateLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="d-flex flex-column align-items-center">
          {createError !== "" ? (
            <span className="text_type_main-large">
              Ошибка при создании заказа
            </span>
          ) : (
            <>
              <p
                className={`${styles.shadow} mt-15 text text_type_digits-large`}
              >
                {createdOrder}
              </p>
              <div className="mt-8 text_type_main-medium">
                индентификатор заказа
              </div>
              <div className="mt-15">
                <DoneIcon />
              </div>
              <div className="mt-15 text text_type_main-default">
                Ваш заказ начали готовить
              </div>
              <div className="mt-2 text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(CreateOrderDetails);

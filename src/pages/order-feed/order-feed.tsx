import React, { memo, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import OrderCardDetails from "../../components/order-card-details/order-card-details";
import styles from "./order-feed.module.css";
import { TOrder } from "../../services/types/order-type";
import { splitArr } from "../../services/utils";
import { useWebSocket } from "../../hooks/use-web-socket";
import { WSS_FEED_ORDER } from "../../services/constants/constant";

const OrderFeedPage: React.FC = () => {
  const { messages } = useTypedSelector((state) => state.WS);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [createdNumbers, setCreatedNumbers] = useState<TOrder[][]>([]);
  const [doneNumbers, setDoneNumbers] = useState<TOrder[][]>([]);

  const { connect, closeWs } = useWebSocket();

  useEffect(() => {
    connect(WSS_FEED_ORDER);

    return () => {
      closeWs();
    };
  }, []);

  useEffect(() => {
    if (messages != null) {
      setOrders(messages.orders);
      setTotal(messages.total!);
      setTotalToday(messages.totalToday);
    }
  }, [messages]);

  useEffect(() => {
    if (orders.length) {
      const created = orders.filter((item) => item.status === "created");
      const done = orders.filter((item) => item.status === "done");
      setCreatedNumbers(splitArr(created, 10));
      setDoneNumbers(splitArr(done, 10));
    }
  }, [orders]);
  return (
    <div className="d-flex justify-content-center">
      <div className={`${styles.content} d-flex justify-content-between`}>
        <div className="flex-column">
          <p className="text text_type_main-large mt-4">Лента заказов</p>
          {messages !== null && (
            <div className={`${styles.feed_container} mt-4`}>
              {messages?.orders.map((x) => {
                return (
                  <div key={x.number}>
                    <OrderCardDetails order={x} isShowStatus={false} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={"ml-8"}>
          <div className={styles.statuses_wrapper}>
            <section className={styles.statuses}>
              <p className="text text_type_main-medium mt-20">Готовы:</p>
              <div className={styles.statuses_columns}>
                {doneNumbers.length && doneNumbers[0].length ? (
                  doneNumbers.map((doneNumbersColumn, i) => (
                    <div key={i} className={styles.statuses_column}>
                      {doneNumbersColumn.map((item) => (
                        <span
                          key={item.number}
                          className={
                            styles.done + " text text_type_digits-default"
                          }
                        >
                          {item.number}
                        </span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text text_type_main-medium text_color_inactive">
                    нет
                  </p>
                )}
              </div>
            </section>
            <section>
              <p className="text text_type_main-medium mt-20">В работе:</p>
              <div className={styles.statuses_columns}>
                {createdNumbers.length && createdNumbers[0].length ? (
                  createdNumbers.map((createdNumbersColumn, i) => (
                    <div key={i} className={styles.statuses_column}>
                      {createdNumbersColumn.map((item) => (
                        <span
                          key={item.number}
                          className="text text_type_digits-default"
                        >
                          {item.number}
                        </span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text text_type_main-medium text_color_inactive">
                    нет
                  </p>
                )}
              </div>
            </section>
          </div>
          <div>
            <p className="text text_type_main-medium mt-10">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">{total}</p>

            <p className="text text_type_main-medium mt-10">
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderFeedPage);

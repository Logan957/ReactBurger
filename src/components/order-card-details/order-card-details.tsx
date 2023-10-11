import React, { memo, useEffect, useState } from "react";
import { TOrder } from "../../services/types/order-type";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import {
  filterIngredients,
  getStatus,
  sortIngredientsDetails,
} from "../../services/utils";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./order-card-details.module.css";
import {
  TIngredient,
  TIngredientDetails,
} from "../../services/types/ingredient-type";

interface OrderCardDetailsProps {
  order: TOrder;
  isShowStatus: boolean;
}

const OrderCardDetails: React.FC<OrderCardDetailsProps> = ({
  order,
  isShowStatus,
}) => {
  const { ingredients } = useTypedSelector((state) => state.ingredient);
  const location = useLocation();

  const showCount = 4;

  const [ingredientsArray, setIngredientsArray] = useState<TIngredient[]>([]);

  const [sortArray, setSortArray] = useState<TIngredientDetails[]>([]);

  useEffect(() => {
    if (ingredients != null && order != null) {
      const ingredientsArray = filterIngredients(
        ingredients,
        order!.ingredients
      );
      const sortArray = sortIngredientsDetails(ingredientsArray);
      setIngredientsArray(ingredientsArray);
      setSortArray(sortArray);
    }
  }, [order, ingredients]);

  const totalPrice = ingredientsArray.reduce(
    (sum, item) => (sum += item.price),
    0
  );

  const [images, setImages] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sortArray) {
      let bun: boolean = false;
      let targetImages: string[] = [];
      sortArray!.forEach((ingredient) => {
        if (ingredient!.type === "bun" && !bun) {
          bun = true;
          targetImages.push(ingredient!["image_mobile"]);
        }
        if (ingredient!.type !== "bun") {
          targetImages.push(ingredient!["image_mobile"]);
        }
      });
      setImages(targetImages);
      setCount(targetImages.length);
    }
  }, [sortArray]);

  return (
    <Link
      key={order.number}
      to={{
        pathname: `${location.pathname}/${order.number}`,
      }}
      className={styles.link}
      state={{ background: location }}
    >
      <div className={styles.order}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">{"#" + order.number}</p>
          <p className={`${styles.orderDate} text text_type_main-default `}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <p className={styles.name + " text text_type_main-medium pb-6 pt-6"}>
          {order.name}
          <br />
          {isShowStatus && (
            <span
              className="text text_type_main-default"
              style={{ color: order.status === "done" ? "#00CCCC" : "#FFFFFF" }}
            >
              {getStatus(order.status)}
            </span>
          )}
        </p>
        <div className={styles.footer}>
          <div className={styles.images}>
            {images.map((image, i) => {
              let left = -i * 15;
              if (i <= showCount - 1)
                return (
                  <div
                    key={i}
                    className={styles.image_wrapper}
                    style={{ left: left, zIndex: 100 - i }}
                  >
                    <img className={styles.image} src={image} alt="" />
                  </div>
                );
              if (i === showCount)
                return (
                  <div
                    key={i}
                    className={styles.image_wrapper}
                    style={{ left: left, zIndex: 100 - i }}
                  >
                    <p
                      className={
                        styles.count + " text text_type_digits-default"
                      }
                    >
                      {"+" + (count - showCount + 1)}
                    </p>
                    <img
                      className={styles.image}
                      style={{ opacity: 0.5 }}
                      src={image}
                      alt=""
                    />
                  </div>
                );
              return false;
            })}
          </div>
          <div className={styles.coast}>
            <span className="text text_type_digits-default pr-2">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default memo(OrderCardDetails);

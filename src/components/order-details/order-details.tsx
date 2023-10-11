import React, { memo, useEffect, useState } from "react";
import styles from "./order-details.module.css";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { getOrderThunk } from "../../services/reducers/thunks/order-thunk";
import {
  filterIngredients,
  getStatus,
  getStatusColor,
  sortIngredientsDetails,
} from "../../services/utils";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TIngredient,
  TIngredientDetails,
} from "../../services/types/ingredient-type";
import Loader from "../loader/loader";

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { getedOrder, isGetLoading, getError } = useTypedSelector(
    (state) => state.order
  );

  const { ingredients } = useTypedSelector((state) => state.ingredient);

  const [ingredientsArray, setIngredientsArray] = useState<TIngredient[]>([]);

  const [sortArray, setSortArray] = useState<TIngredientDetails[]>([]);

  useEffect(() => {
    if (ingredients != null && getedOrder != null) {
      const ingredientsArray = filterIngredients(
        ingredients,
        getedOrder!.ingredients
      );
      const sortArray = sortIngredientsDetails(ingredientsArray);
      setIngredientsArray(ingredientsArray);
      setSortArray(sortArray);
    }
  }, [dispatch, getedOrder, ingredients]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getOrderThunk(id!));
  }, [dispatch, id]);

  const totalPrice = ingredientsArray.reduce(
    (sum, item) => (sum += item.price),
    0
  );

  return (
    <div>
      {isGetLoading ? (
        <>
          <Loader />
        </>
      ) : (
        getedOrder && (
          <div className={`d-flex flex-column align-items-center`}>
            {getError !== "" ? (
              <span className="text text_type_main-default text_color_inactive">
                Произошла ошибка при получении данных о заказе
              </span>
            ) : (
              <div className={`${styles.card} d-flex  flex-column`}>
                <p className={"text-center text text_type_digits-default pt-4"}>
                  #{getedOrder!.number}
                </p>
                <p className="text text_type_main-medium pt-10">
                  {getedOrder!.name}
                </p>
                <p className="text text_type_main-default pt-2">
                  <span style={{ color: getStatusColor("done") }}>
                    {getStatus(getedOrder!.status)}
                  </span>
                </p>
                <p className="text text_type_main-medium pt-15">Состав:</p>
                <div className={`${styles.ingredient_container}`}>
                  {sortArray &&
                    sortArray?.map((ingredient, i) => {
                      return (
                        <div
                          key={i}
                          className={
                            " mt-4 pr-3 d-flex  justify-content-between align-items-center"
                          }
                        >
                          <div className={`d-flex align-items-center`}>
                            <div className={styles.image_wrapper + " mr-4"}>
                              <img
                                className={styles.image}
                                src={ingredient!.image_mobile}
                                alt=""
                              />
                            </div>
                            <div className={" text text_type_main-default"}>
                              {ingredient!.name}
                            </div>
                          </div>

                          <div className={" text text_type_digits-default"}>
                            <span className="pr-2">
                              {ingredient.quantity &&
                                ingredient.quantity > 1 &&
                                ingredient.quantity + " x "}
                              {ingredient!.price}
                            </span>
                            <CurrencyIcon type="primary" />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.footer + " mt-10 pr-2 pb-10"}>
                  <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(getedOrder.createdAt)} />
                  </p>
                  <div
                    className={styles.price + " text text_type_digits-default"}
                  >
                    <span className="pr-2">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default memo(OrderDetails);

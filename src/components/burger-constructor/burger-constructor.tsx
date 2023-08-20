import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useCallback, useEffect } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useModal } from "../../hooks/useModal";
import Modal from "../modals/modal/modal";
import OrderDetails from "../modals/order-details/order-details";
import styles from "./burger-constructor.module.css";
import React from "react";
import DropIngredientTarget from "../dnd/drop-ingredient-target";
import {
  addIngredient,
  clearCreatedOrderThunk,
  createNewOrderThunk,
  removeIngredientThunk,
  setTotalPriceThunk,
  updateIngredientsThunk,
} from "../../services/reducers/thunks/order-thunk";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { TIngredient } from "../../services/types/ingredient-type";
import DragConstructorElement from "../dnd/drag-constructor-element";
import update from "immutability-helper";

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { newOrder } = useTypedSelector((state) => state.order);

  useEffect(() => {
    const totalPrice =
      (newOrder.currentBun?.price! * 2 || 0) +
      newOrder.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );
    dispatch(setTotalPriceThunk(totalPrice));
  }, [dispatch, newOrder.currentBun, newOrder.ingredients]);

  const handleDrop = useCallback(
    (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const removeIngredient = useCallback(
    (index: number) => () => {
      dispatch(removeIngredientThunk(index));
    },
    [dispatch]
  );

  const createOrder = useCallback(() => {
    dispatch(createNewOrderThunk(newOrder));
    openModal();
  }, [dispatch, openModal, newOrder]);

  const handleCloseModal = useCallback(() => {
    closeModal();
    dispatch(clearCreatedOrderThunk());
  }, [closeModal, dispatch]);

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );

  const moveConstructor = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedIngredients = update(newOrder.ingredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, newOrder.ingredients[dragIndex]],
        ],
      }) as TIngredient[];

      dispatch(updateIngredientsThunk(updatedIngredients));
    },
    [dispatch, newOrder.ingredients]
  );

  return (
    <div className="mt-25 ml-10">
      <div className={`flex-column`}>
        <DropIngredientTarget onDropHandler={handleDrop}>
          <div className={`${styles.drop_zone}`}>
            {newOrder.currentBun != null && (
              <ConstructorElement
                extraClass="ml-8"
                type="top"
                isLocked={true}
                text={`${newOrder.currentBun.name} (вверх)`}
                price={newOrder.currentBun.price}
                thumbnail={newOrder.currentBun.image}
              />
            )}
            <div className={`${styles.constructor_container} pr-2`}>
              {newOrder.ingredients.map((x, index) => {
                return (
                  <div key={x._id + index}>
                    <DragConstructorElement
                      moveConstructor={moveConstructor}
                      removeIngredient={removeIngredient}
                      ingredient={x}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
            {newOrder.currentBun != null && (
              <ConstructorElement
                extraClass="ml-8 mt-4"
                type="bottom"
                isLocked={true}
                text={`${newOrder.currentBun.name} (низ)`}
                price={newOrder.currentBun.price}
                thumbnail={newOrder.currentBun.image}
              />
            )}
          </div>
        </DropIngredientTarget>
      </div>

      <div className="d-flex align-items-center mt-10 justify-content-end">
        <div className="d-flex">
          <div className="me-2 text text_type_digits-medium">
            {newOrder.totalPrice}
          </div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrder}
        >
          Оформить заказ
        </Button>
        {isModalOpen && modal}
      </div>
    </div>
  );
};

export default memo(BurgerConstructor);

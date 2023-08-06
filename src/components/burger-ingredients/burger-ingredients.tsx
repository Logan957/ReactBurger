import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useCallback, useState } from "react";
import { TIngredient } from "../../utils/types";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./burger-ingredients.module.css";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

interface IBurgerIngredientsProps {
  ingredients: Array<TIngredient>;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = (props) => {
  const [currentTab, setCurrentTab] = useState("burgers");

  const [currentIngredient, setCurrentIngredient] =
    useState<TIngredient | null>(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  // Верно же, что тут тогда не нужен useCallback?
  const handleOpenModal = (ingredient: TIngredient) => () => {
    setCurrentIngredient(ingredient);
    openModal();
  };

  // А тут нужен раз передаем как props
  const handleCloseModal = useCallback(() => {
    closeModal();
    setCurrentIngredient(null);
  }, [closeModal]);

  const modal = (
    <Modal title="Детали ингредиента" onClose={handleCloseModal}>
      <IngredientDetails ingredient={currentIngredient!} />
    </Modal>
  );

  return (
    <div className={`${styles.card}`}>
      <h1 className="text text_type_main-medium mt-8">Соберите бургер</h1>
      <div className="d-flex mt-2">
        <Tab
          value="burgers"
          active={currentTab === "burgers"}
          onClick={setCurrentTab}
        >
          Бургеры
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="toppings"
          active={currentTab === "toppings"}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container}`}>
        {currentTab === "burgers" && (
          <>
            <div className="mt-10 text text_type_main-medium">Булки</div>
            <div className={`d-flex flex-wrap mt-6`}>
              {props.ingredients
                .filter((x) => x.type === "bun")
                .map((x) => {
                  return (
                    <div key={x._id} onClick={handleOpenModal(x)}>
                      <IngredientCard ingredient={x} />
                    </div>
                  );
                })}
            </div>
          </>
        )}
        {currentTab === "sauces" && (
          <>
            <div className="mt-10 text text_type_main-medium">Соусы</div>
            <div className="d-flex flex-wrap mt-6">
              {props.ingredients
                .filter((x) => x.type === "sauce")
                .map((x) => {
                  return (
                    <div key={x._id} onClick={handleOpenModal(x)}>
                      <IngredientCard ingredient={x} />
                    </div>
                  );
                })}
            </div>
          </>
        )}
        {currentTab === "toppings" && (
          <>
            <div className="mt-10 text text_type_main-medium">Начинки</div>
            <div className="d-flex flex-wrap mt-6">
              {props.ingredients
                .filter((x) => x.type === "main")
                .map((x) => {
                  return (
                    <div key={x._id} onClick={handleOpenModal(x)}>
                      <IngredientCard key={x._id} ingredient={x} />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      {isModalOpen && modal}
    </div>
  );
};

export default memo(BurgerIngredients);

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { TIngredient } from "../../utils/types";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./burger-ingredients.module.css";

interface IBurgerIngredientsProps {
  ingredients: Array<TIngredient>;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = (props) => {
  const [current, setCurrent] = React.useState("burgers");

  return (
    <div className={`${styles.card}`}>
      <h1 className="text text_type_main-medium mt-8">Соберите бургер</h1>

      <div className="d-flex mt-2">
        <Tab
          value="burgers"
          active={current === "burgers"}
          onClick={setCurrent}
        >
          Бургеры
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="toppings"
          active={current === "toppings"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container}`}>
        {current === "burgers" && (
          <>
            <div className="mt-10 text text_type_main-medium">Булки</div>
            <div className={`d-flex flex-wrap mt-6`}>
              {props.ingredients
                .filter((x) => x.type == "bun")
                .map((x) => {
                  return <IngredientCard key={x._id} ingredient={x} />;
                })}
            </div>
          </>
        )}
        {current === "sauces" && (
          <>
            <div className="mt-10 text text_type_main-medium">Соусы</div>
            <div className="d-flex flex-wrap mt-6">
              {props.ingredients
                .filter((x) => x.type == "sauce")
                .map((x) => {
                  return <IngredientCard key={x._id} ingredient={x} />;
                })}
            </div>
          </>
        )}
        {current === "toppings" && (
          <>
            <div className="mt-10 text text_type_main-medium">Начинки</div>
            <div className="d-flex flex-wrap mt-6">
              {props.ingredients
                .filter((x) => x.type == "main")
                .map((x) => {
                  return <IngredientCard ingredient={x} key={x._id} />;
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;

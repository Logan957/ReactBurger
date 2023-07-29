import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../../utils/data";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("burgers");

  return (
    <div className={`${styles.card}`}>
      <div className="text text_type_main-medium mt-8">Соберите бургер</div>

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
        <div>
          <div className="mt-10 text text_type_main-medium">Булки</div>

          <div className={`d-flex flex-wrap mt-6`}>
            {data
              .filter((x) => x.type == "bun")
              .map((x) => {
                return (
                  <div key={x._id}>
                    <IngredientCard ingredient={x} />
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div className="mt-10 text text_type_main-medium">Соусы</div>

          <div className="d-flex flex-wrap mt-6">
            {data
              .filter((x) => x.type == "sauce")
              .map((x) => {
                return (
                  <div key={x._id}>
                    <IngredientCard ingredient={x} />
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div className="mt-10 text text_type_main-medium">Начинки</div>

          <div className="d-flex flex-wrap mt-6">
            {data
              .filter((x) => x.type == "main")
              .map((x) => {
                return (
                  <div key={x._id}>
                    <IngredientCard ingredient={x} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("burgers");

  return (
    <>
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
    </>
  );
};

export default BurgerIngredients;

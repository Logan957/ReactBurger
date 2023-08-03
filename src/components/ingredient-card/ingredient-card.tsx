import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./ingredient-card.module.css";
import { TIngredient } from "../../utils/types";

interface IIngredientCardProps {
  ingredient: TIngredient;
}

const IngredientCard: React.FC<IIngredientCardProps> = (props) => {
  return (
    <div className={`${styles.card} d-flex flex-column align-items-center`}>
      <img src={props.ingredient.image} alt={props.ingredient.name} />
      <div className="d-flex align-items-center">
        <span className="me-2 text text_type_digits-default">
          {props.ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div className="text text_type_main-default text-center">
        {props.ingredient.name}
      </div>
    </div>
  );
};

export default IngredientCard;

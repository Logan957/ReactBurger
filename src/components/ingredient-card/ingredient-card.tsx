import React, { memo } from "react";
import { TIngredient } from "../../services/types/ingredient-types";
import styles from "./ingredient-card.module.css";

interface IIngredientCardProps {
  ingredient: TIngredient;
}

const IngredientCard: React.FC<IIngredientCardProps> = (props) => {
  return (
    <div className={`${styles.card} d-flex flex-column align-items-center`}>
      <img src={props.ingredient.image} alt={props.ingredient.name} />
      <div className="text text_type_main-default text-center">
        {props.ingredient.name}
      </div>
    </div>
  );
};

export default memo(IngredientCard);

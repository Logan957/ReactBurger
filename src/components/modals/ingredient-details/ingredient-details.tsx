import React, { memo } from "react";
import styles from "./ingredient-details.module.css";
import { TIngredient } from "../../../utils/types";

interface IIngredientDetailsProps {
  ingredient: TIngredient;
}

const IngredientDetails: React.FC<IIngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={`${styles.card} d-flex flex-column align-items-center`}>
      <img
        className={styles.img_size}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className="mt-4 text text_type_main-medium text-center">
        {ingredient.name}
      </div>
      <div className="mt-8 d-flex text_color_inactive text-center">
        <div>
          <div className="text text_type_main-default">Калории, ккал</div>
          <div className="text text_type_digits-default mt-2">
            {ingredient.calories}
          </div>
        </div>
        <div className="ml-5">
          <div className="text text_type_main-default">Белки, г</div>
          <div className="text text_type_digits-default mt-2">
            {ingredient.proteins}
          </div>
        </div>
        <div className="ml-5">
          <div className="text text_type_main-default">Жиры, г</div>
          <div className="text text_type_digits-default mt-2">
            {ingredient.fat}
          </div>
        </div>
        <div className="ml-5">
          <div className="text text_type_main-default">Углеводы, г</div>
          <div className="text text_type_digits-default mt-2">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(IngredientDetails);

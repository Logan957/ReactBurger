import React, { memo } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { TIngredient } from "../../services/types/ingredient-type";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";

const IngredientDetailsPage: React.FC = () => {
  const { ingredients, isIngridientsLoading } = useTypedSelector(
    (state) => state.ingredient
  );
  const { ingredientId } = useParams();

  let ingredient: TIngredient | null = null;

  if (!isIngridientsLoading) {
    ingredient = ingredients.find((x) => x._id === ingredientId)!;
  }

  return (
    <>
      {ingredient != null && (
        <div
          className={`${styles.container} ${styles.container}  d-flex flex-column align-items-center`}
        >
          <p className="text text_type_main-large mt-30">Детали ингредиента</p>
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
      )}
    </>
  );
};

export default memo(IngredientDetailsPage);

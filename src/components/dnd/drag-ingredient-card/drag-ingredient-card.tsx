import React, { memo } from "react";
import { TIngredient } from "../../../services/types/ingredient-type";
import styles from "./drag-ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

interface IIngredientCardProps {
  ingredient: TIngredient;
  count: number;
}

const DragIngredientCard: React.FC<IIngredientCardProps> = ({
  ingredient,
  count,
}) => {
  const location = useLocation();

  const ingredientId = ingredient._id;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {
      ingredient: ingredient,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div ref={dragRef} className="position-relative">
          {count > 0 && <Counter count={count} size="default" extraClass="" />}
          <div
            className={`${styles.card} d-flex flex-column align-items-center`}
          >
            <img src={ingredient.image} alt={ingredient.name} />
            <div className="d-flex align-items-center">
              <span className="me-2 text text_type_digits-default">
                {ingredient.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <div className="text text_type_main-default text-center">
              {ingredient.name}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default memo(DragIngredientCard);

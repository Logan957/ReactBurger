import React, { memo } from "react";
import styles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/modals/ingredient-details/ingredient-details";

const IngredientDetailsPage: React.FC = () => {
  return (
    <>
      <div
        className={`${styles.container}  d-flex flex-column align-items-center`}
      >
        <p className="text text_type_main-large">Детали ингредиента</p>
        <IngredientDetails />
      </div>
    </>
  );
};

export default memo(IngredientDetailsPage);

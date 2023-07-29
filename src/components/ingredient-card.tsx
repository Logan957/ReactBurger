import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./ingredient-card.module.css";

const IngridientCard = (props: any) => {
  return (
    <div className={`${styles.card} d-flex flex-column align-items-center`}>
      <img src={props.data.image} />
      <div className="d-flex align-items-center">
        <span className="me-2 text text_type_digits-default">
          {props.data.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div className="text text_type_main-default text-center">
        {props.data.name}
      </div>
    </div>
  );
};

export default IngridientCard;

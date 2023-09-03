import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import { memo } from "react";
import { PageRoutes } from "../../services/constants/constant";

const AppHeader = () => {
  return (
    <header className={`${styles.header} d-flex justify-content-center`}>
      <div className={`${styles.content} d-flex justify-content-between`}>
        <div className={`${styles.constructor_button}`}>
          <Link className="text-decoration-none" to="/">
            <BurgerIcon type="primary" />
            <span
              className={`${styles.text_white} ms-2 text text_type_main-default`}
            >
              Конструктор
            </span>
          </Link>
          <Link to="/" className="ml-8 text-decoration-none">
            <ListIcon type="secondary" />
            <span className="ms-2 text text_type_main-default text_color_inactive">
              Лента заказа
            </span>
          </Link>
        </div>
        <div className={`${styles.logo}`}>
          <Logo />
        </div>
        <Link
          to={PageRoutes.PROFILE}
          className={`${styles.personal_area_button} text-decoration-none`}
        >
          <ProfileIcon type="secondary" />
          <span className="ms-2 text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};

export default memo(AppHeader);

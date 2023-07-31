import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.constructor_button}`}>
        <a className="text-decoration-none" href="">
          <BurgerIcon type="primary" />
          <span
            className={`${styles.text_white} ms-2 text text_type_main-default`}
          >
            Конструктор
          </span>
        </a>
        <a href="" className="ml-8 text-decoration-none">
          <ListIcon type="secondary" />
          <span className="ms-2 text text_type_main-default text_color_inactive">
            Лента заказа
          </span>
        </a>
      </div>
      <div className={`${styles.logo}`}>
        <Logo />
      </div>
      <a
        href=""
        className={`${styles.personal_area_button} text-decoration-none`}
      >
        <ProfileIcon type="secondary" />
        <span className="ms-2 text text_type_main-default text_color_inactive">
          Личный кабинет
        </span>
      </a>
    </header>
  );
};

export default AppHeader;

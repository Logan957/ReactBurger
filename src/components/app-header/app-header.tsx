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
    <div className={`${styles.header} d-flex d-row`}>
      <Button
        extraClass={`${styles.constructor_button}`}
        htmlType="button"
        type="secondary"
        size="large"
      >
        <BurgerIcon type="primary" />
        <span
          className={`${styles.text_white} ms-2 text text_type_main-default`}
        >
          Конструктор
        </span>
      </Button>
      <Button htmlType="button" type="secondary" size="large">
        <ListIcon type="secondary" />
        <span className="ms-2 text text_type_main-default text_color_inactive">
          Лента заказа
        </span>
      </Button>
      <div className={`${styles.logo}`}>
        <Logo />
      </div>
      <Button
        extraClass={`${styles.personal_area_button}`}
        htmlType="button"
        type="secondary"
        size="large"
      >
        <ProfileIcon type="secondary" />
        <span className="ms-2 text text_type_main-default text_color_inactive">
          Личный кабинет
        </span>
      </Button>
    </div>
  );
};

export default AppHeader;

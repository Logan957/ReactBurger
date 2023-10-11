import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import { memo } from "react";
import { PageRoutes } from "../../services/constants/constant";

const AppHeader = () => {
  const location = useLocation();

  const isFeedItemPath = location.pathname.startsWith("/feed");
  return (
    <header className={`${styles.header} d-flex justify-content-center`}>
      <div className={`${styles.content} d-flex justify-content-between`}>
        <div className={`${styles.constructor_button}`}>
          <Link
            className={`${styles.link} ${
              location.pathname === "/"
                ? styles.isActive
                : "text_color_inactive"
            }`}
            to="/"
          >
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            <span className={`ms-2 text text_type_main-default`}>
              Конструктор
            </span>
          </Link>
          <Link
            to={PageRoutes.ORDER_FEED}
            className={`ml-8 ${styles.link} ${
              isFeedItemPath ? styles.isActive : "text_color_inactive"
            }`}
          >
            <ListIcon type={isFeedItemPath ? "primary" : "secondary"} />
            <span className="ms-2 text text_type_main-default">
              Лента заказов
            </span>
          </Link>
        </div>
        <Link to="/" className={`${styles.logo}`}>
          <Logo />
        </Link>
        <Link
          to={PageRoutes.PROFILE}
          className={`${styles.link} ${
            location.pathname === PageRoutes.PROFILE
              ? styles.isActive
              : "text_color_inactive"
          }`}
        >
          <ProfileIcon
            type={
              location.pathname === PageRoutes.PROFILE ? "primary" : "secondary"
            }
          />
          <span className="ms-2 text text_type_main-default">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};

export default memo(AppHeader);

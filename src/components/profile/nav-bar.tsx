import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./nav-bar.module.css";
import { PageRoutes } from "../../services/constants/constant";

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <div className={`d-flex flex-column ${styles.content}`}>
      <NavLink
        to={PageRoutes.PROFILE}
        className={`${styles.link} text text_type_main-medium mt-30 ${
          location.pathname === PageRoutes.PROFILE ? styles.isActive : ""
        }`}
      >
        Профиль
      </NavLink>
      <NavLink
        to={PageRoutes.PROFILE_ORDERS}
        className={`${styles.link} text text_type_main-medium mt-4 ${
          location.pathname.startsWith(PageRoutes.PROFILE_ORDERS)
            ? styles.isActive
            : ""
        }`}
      >
        История заказов
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.link} text text_type_main-medium  mt-4${
            isActive ? styles.isActive : ""
          }`
        }
      >
        Выход
      </NavLink>

      <span className={`${styles.footer} mt-20 text text_type_main-small`}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </div>
  );
};

export default memo(NavBar);

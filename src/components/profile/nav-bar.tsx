import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { PageRoutes } from "../../services/constants/constant";
import { logoutThunk } from "../../services/reducers/thunks/user-thunk";
import styles from "./nav-bar.module.css";

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch(logoutThunk());
  };

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
      <span
        onClick={logout}
        className={`${styles.link} text text_type_main-medium  mt-4 cursor-pointer`}
      >
        Выход
      </span>

      <span className={`${styles.footer} mt-20 text text_type_main-small`}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </div>
  );
};

export default memo(NavBar);

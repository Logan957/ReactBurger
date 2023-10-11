import { memo, useCallback, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login/login";
import NotFound404Page from "../../pages/not-found/not-found";
import ProfileOrdersPage from "../../pages/profile/profile-orders/profile-orders";
import ProfilePage from "../../pages/profile/profile/profile";
import RegisterPage from "../../pages/register/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import IngredientPage from "../../pages/ingredient/ingredient-details";
import OrderFeedPage from "../../pages/order-feed/order-feed";
import OrderFeedDetailsPage from "../../pages/order-feed-details/order-feed-details";
import ProfileOrderDetailsPage from "../../pages/profile/profile-order-details/profile-order-details";
import { PageRoutes } from "../../services/constants/constant";
import { checkUserAuthThunk } from "../../services/reducers/thunks/user-thunk";
import AppHeader from "../app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import { getIngredientsThunk } from "../../services/reducers/thunks/ingredient-thunk";
import OrderDetails from "../order-details/order-details";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = useCallback(() => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path={PageRoutes.ORDER_FEED} element={<OrderFeedPage />} />
        <Route
          path={PageRoutes.ORDER_FEED_DETAILS}
          element={<OrderFeedDetailsPage />}
        />
        <Route
          path={PageRoutes.LOGIN}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={PageRoutes.PROFILE}
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route
          path={PageRoutes.PROFILE_ORDERS}
          element={<OnlyAuth component={<ProfileOrdersPage />} />}
        />
        <Route
          path={PageRoutes.PROFILE_ORDERS_DETAILS}
          element={<ProfileOrderDetailsPage />}
        />
        <Route
          path={PageRoutes.REGISTER}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={PageRoutes.FORGOT_PASSWORD}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={PageRoutes.RESET_PASSWORD}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={PageRoutes.ORDER_FEED_DETAILS}
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path={PageRoutes.PROFILE_ORDERS_DETAILS}
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default memo(App);

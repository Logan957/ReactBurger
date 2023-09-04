import { memo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login/login";
import NotFound404Page from "../../pages/not-found/not-found";
import ProfileOrdersPage from "../../pages/profile/profile-orders/profile-orders";
import ProfilePage from "../../pages/profile/profile/profile";
import RegisterPage from "../../pages/register/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { PageRoutes } from "../../services/constants/constant";
import { checkUserAuthThunk } from "../../services/reducers/thunks/user-thunk";
import AppHeader from "../app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path={PageRoutes.REGISTER} element={<RegisterPage />} />
          <Route
            path={PageRoutes.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={PageRoutes.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<NotFound404Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default memo(App);

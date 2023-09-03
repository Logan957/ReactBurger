import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import HomePage from "../../pages/home";
import ProfilePage from "../../pages/profile/profile/profile";
import ProfileOrdersPage from "../../pages/profile/profile-orders/profile-orders";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProtectedRouteElement from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import { PageRoutes } from "../../services/constants/constant";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path={PageRoutes.PROFILE}
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path={PageRoutes.PROFILE_ORDERS}
            element={<ProtectedRouteElement element={<ProfileOrdersPage />} />}
          />
          <Route path={PageRoutes.LOGIN} element={<LoginPage />} />
          <Route path={PageRoutes.REGISTER} element={<RegisterPage />} />
          <Route
            path={PageRoutes.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={PageRoutes.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default memo(App);

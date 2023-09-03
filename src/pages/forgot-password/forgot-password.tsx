import React, { memo, useEffect } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";

import styles from "./forgot-password.module.css";
import {
  getResetCodeThunk,
  resetGetedCodeThunk,
} from "../../services/reducers/thunks/user-thunk";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { PageRoutes } from "../../services/constants/constant";
import Loader from "../../components/loader/loader";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getedCode, isGetCodeLoading } = useTypedSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (getedCode) {
      navigate(PageRoutes.RESET_PASSWORD);
      dispatch(resetGetedCodeThunk());
    }
  }, [getedCode, navigate, dispatch]);

  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const resetPassword = () => {
    dispatch(getResetCodeThunk(email));
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      {isGetCodeLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <p className="text text_type_main-medium text-center">
            Восстановление пароля
          </p>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
          />
          <div className="text-center mt-6">
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              extraClass={`${styles.button_size}`}
              onClick={resetPassword}
            >
              Восстановить
            </Button>
          </div>
          <p className="text-center mt-20 text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login" className="ml-1">
              Войти
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default memo(ForgotPasswordPage);

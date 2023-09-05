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
import { FormValues, useForm } from "../../hooks/use-form";

interface ForgotPasswordForm extends FormValues {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getedCode, isGetCodeLoading } = useTypedSelector(
    (state) => state.user
  );

  const { values, handleChange } = useForm<ForgotPasswordForm>({
    email: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getResetCodeThunk(values.email));
  };

  useEffect(() => {
    if (getedCode) {
      navigate(PageRoutes.RESET_PASSWORD);
      dispatch(resetGetedCodeThunk());
    }
  }, [getedCode, navigate, dispatch]);

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
          <form onSubmit={handleSubmit}>
            <EmailInput
              onChange={handleChange}
              value={values.email}
              name={"email"}
              isIcon={false}
              extraClass="mt-6"
            />
            <div className="text-center mt-6">
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass={`${styles.button_size}`}
              >
                Восстановить
              </Button>
            </div>
          </form>
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

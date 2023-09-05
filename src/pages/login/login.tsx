import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { loginThunk } from "../../services/reducers/thunks/user-thunk";
import styles from "./login.module.css";
import { FormValues, useForm } from "../../hooks/use-form";

interface LoginForm extends FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginThunk(values.email, values.password));
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">Вход</p>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-2 mt-6"
        />
        <div className="text-center mt-6">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`${styles.button_size}`}
          >
            Войти
          </Button>
        </div>
      </form>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to="/register"> Зарегистрироваться</Link>
      </p>
      <p className="text-center mt-1 text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default memo(LoginPage);

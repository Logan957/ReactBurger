import React, { memo, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { loginThunk } from "../../services/reducers/thunks/user-thunk";
import { useTypedSelector } from "../../hooks/use-typed-selector";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = () => {
    dispatch(loginThunk(email, password));
  };

  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">Вход</p>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={"email"}
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mb-2 mt-6"
      />
      <div className="text-center mt-6">
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`${styles.button_size}`}
          onClick={login}
        >
          Войти
        </Button>
      </div>
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

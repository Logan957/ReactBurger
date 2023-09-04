import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { loginThunk } from "../../services/reducers/thunks/user-thunk";
import styles from "./login.module.css";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const login = useCallback(() => {
    dispatch(loginThunk(email, password));
  }, [dispatch, email, password]);

  //const navigate = useNavigate();

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

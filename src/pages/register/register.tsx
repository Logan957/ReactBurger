import React, { memo, useCallback, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { registerThunk } from "../../services/reducers/thunks/user-thunk";
import { useTypedSelector } from "../../hooks/use-typed-selector";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState("");
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const [password, setPassword] = React.useState("");
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const [name, setName] = React.useState("");
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const register = useCallback(() => {
    dispatch(registerThunk(email, name, password));
  }, [dispatch, email, name, password]);

  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeName}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
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
          onClick={register}
        >
          Зарегистрироваться
        </Button>
      </div>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className="ml-1">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default memo(RegisterPage);

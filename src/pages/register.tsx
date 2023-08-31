import React, { memo } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [name, setName] = React.useState("");
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
        >
          Зарегистрироваться
        </Button>
      </div>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
};

export default memo(RegisterPage);

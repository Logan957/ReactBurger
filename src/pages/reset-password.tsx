import React, { memo } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [code, setCode] = React.useState("");
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">
        Восстановление пароля
      </p>
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mb-2 mt-6"
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChangeCode}
        value={code}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <div className="text-center mt-6">
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`${styles.button_size}`}
        >
          Сохранить
        </Button>
      </div>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login"> Войти</Link>
      </p>
    </div>
  );
};

export default memo(ResetPasswordPage);

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { resetPassswordThunk } from "../../services/reducers/thunks/user-thunk";
import styles from "./reset-password.module.css";
import { FormValues, useForm } from "../../hooks/use-form";

interface ResetPasswordForm extends FormValues {
  code: string;
  password: string;
}

const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm<ResetPasswordForm>({
    code: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetPassswordThunk(values.password, values.code));
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">
        Восстановление пароля
      </p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-2 mt-6"
          placeholder="Введите новый пароль"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
        />
        <div className="text-center mt-6">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`${styles.button_size}`}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default memo(ResetPasswordPage);

import React, { memo } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { registerThunk } from "../../services/reducers/thunks/user-thunk";
import { FormValues, useForm } from "../../hooks/use-form";

interface RegisterForm extends FormValues {
  email: string;
  password: string;
  name: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm<RegisterForm>({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerThunk(values.email, values.name, values.password));
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
      <p className="text text_type_main-medium text-center">Регистрация</p>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
        />
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
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

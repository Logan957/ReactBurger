import React, { memo } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "./forgot-password.module.css";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className={`${styles.container} d-flex flex-column`}>
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
        >
          Восстановить
        </Button>
      </div>
      <p className="text-center mt-20 text text_type_main-default text_color_inactive">
        Вспомнили пароль?<Link to="/login"> Войти</Link>
      </p>
    </div>
  );
};

export default memo(ForgotPasswordPage);

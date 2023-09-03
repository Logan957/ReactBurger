import React, { memo } from "react";
import NavBar from "../../../components/profile/nav-bar";
import styles from "./profile.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfilePage: React.FC = () => {
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
    <>
      <div className=" d-flex justify-content-center">
        <div className={`${styles.content} d-flex justify-content-between`}>
          <NavBar />
          <div className={styles.form}>
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
              placeholder={"Логин"}
              value={email}
              name={"Логин"}
              isIcon={false}
              extraClass="mt-6"
            />
            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={"password"}
              extraClass="mb-2 mt-6"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePage);

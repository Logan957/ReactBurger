import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useCallback } from "react";
import NavBar from "../../../components/profile/nav-bar";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useTypedSelector } from "../../../hooks/use-typed-selector";
import { updateUserThunk } from "../../../services/reducers/thunks/user-thunk";
import styles from "./profile.module.css";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useTypedSelector((state) => state.user);

  const [email, setEmail] = React.useState(user?.email ?? "");
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

  const [name, setName] = React.useState(user?.name ?? "");
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const updateUser = useCallback(() => {
    dispatch(updateUserThunk(email, name, password));
  }, [dispatch, email, name, password]);

  const resetUser = useCallback(() => {
    setEmail(user?.email ?? "");
    setName(user?.name ?? "");
    setPassword("");
  }, [user]);

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
            {password !== "" && email !== "" && name !== "" && (
              <div className="d-flex justify-content-end mt-3">
                <Button
                  htmlType="button"
                  type="secondary"
                  size="medium"
                  onClick={resetUser}
                >
                  Отменить
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="medium"
                  onClick={updateUser}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePage);

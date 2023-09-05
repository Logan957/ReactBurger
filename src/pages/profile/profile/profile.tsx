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
import { FormValues, useForm } from "../../../hooks/use-form";

interface ProfileForm extends FormValues {
  email: string;
  password: string;
  name: string;
}

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useTypedSelector((state) => state.user);

  const { values, setValues, handleChange } = useForm<ProfileForm>({
    email: user?.email ?? "",
    password: "",
    name: user?.name ?? "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUserThunk(values.email, values.name, values.password));
  };

  const resetUser = useCallback(() => {
    setValues({
      email: user?.email ?? "",
      name: user?.name ?? "",
      password: "",
    });
  }, [user, setValues]);

  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className={`${styles.content} d-flex justify-content-between`}>
          <NavBar />
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
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
                placeholder={"Логин"}
                value={values.email}
                name={"Логин"}
                isIcon={false}
                extraClass="mt-6"
              />
              <PasswordInput
                onChange={handleChange}
                value={values.password}
                name={"password"}
                extraClass="mb-2 mt-6"
              />
              {values.password !== "" &&
                values.email !== "" &&
                values.name !== "" && (
                  <div className="d-flex justify-content-end mt-3">
                    <Button
                      htmlType="button"
                      type="secondary"
                      size="medium"
                      onClick={resetUser}
                    >
                      Отменить
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                      Сохранить
                    </Button>
                  </div>
                )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePage);

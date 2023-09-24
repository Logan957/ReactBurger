import {
  API_URL_LOGIN,
  API_URL_LOGOUT,
  API_URL_REGISTER,
  API_URL_RESET_PASSWORD,
  API_URL_RESET_PASSWORD_RESET,
  API_URL_USER,
} from "../../constants/constant";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import { fetchWithRefresh, request } from "../../utils";
import {
  getCodeError,
  getedCode,
  isGetCodeLoading,
  isLoginLoading,
  isRegisterLoading,
  isUserLoading,
  loginError,
  registerError,
  resetGetedCode,
  setAuthChecked,
  setLoginUser,
  setRegisterUser,
  setUser,
  userError,
} from "../slices/user-slice";

export const getUserThunk = (): TAppThunk => async (dispatch: TAppDispatch) => {
  try {
    dispatch(isUserLoading());
    const response = await fetchWithRefresh(`${API_URL_USER}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    dispatch(setUser(response.user));
    dispatch(setAuthChecked(true));
  } catch (error) {
    dispatch(userError("Ошибка"));
  }
};

export const updateUserThunk =
  (email: string, name: string, password: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    try {
      dispatch(isUserLoading());
      const response = await fetchWithRefresh(`${API_URL_USER}`, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
          
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        })
      });
      dispatch(setUser(response.user));
    } catch (error) {
      dispatch(userError("Ошибка"));
    }
  };

export const checkUserAuthThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserThunk());
    } else {
      dispatch(setAuthChecked(true));
    }
  };

export const loginThunk =
  (email: string, password: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    try {
      dispatch(isLoginLoading());
      const response = await request(`${API_URL_LOGIN}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      dispatch(setLoginUser(response.user));
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
    } catch (error) {
      dispatch(loginError("Ошибка"));
    }
  };

export const logoutThunk = (): TAppThunk => async (dispatch: TAppDispatch) => {
  try {
    dispatch(isLoginLoading());
    const response = await request(`${API_URL_LOGOUT}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    if (response.success) {
      dispatch(setUser(null));
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  } catch (error) {
    dispatch(loginError("Ошибка"));
  }
};

export const registerThunk =
  (email: string, name: string, password: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    try {
      dispatch(isRegisterLoading());
      const response = await request(`${API_URL_REGISTER}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      dispatch(setRegisterUser(response.user));
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);

    } catch (error) {
      dispatch(registerError("Ошибка"));
    }
  };

export const getResetCodeThunk =
  (email: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    try {
      dispatch(isGetCodeLoading());
      const response = await request(`${API_URL_RESET_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      dispatch(getedCode(response.success));
    } catch (error) {
      dispatch(getCodeError("Ошибка"));
    }
  };

export const resetGetedCodeThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    dispatch(resetGetedCode());
  };

export const resetPassswordThunk =
  (password: string, token: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    try {
      const response = await request(`${API_URL_RESET_PASSWORD_RESET}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          token: token,
        }),
      });
      return response.success;
    } catch (error) {
      return false;
    }
  };

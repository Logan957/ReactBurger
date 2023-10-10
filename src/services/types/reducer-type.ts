import {
  Action,
  AnyAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { TIngredient } from "./ingredient-type";
import { TNewOrder, TOrder } from "./order-type";
import { TUser } from "./user-type";
import { IMessage } from "./message-type";
import { store } from "../store";

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch &
  ThunkDispatch<TRootState, null, AnyAction>;
export type TAppThunk = ThunkAction<void, TRootState, null, Action<string>>;

export type TIngridientState = {
  isIngridientsLoading: boolean;
  ingredientsError: string;
  ingredients: Array<TIngredient>;

  currentIngridient: TIngredient | null;
};

export type TOrderState = {
  createdOrder: number | null;
  isCreateLoading: boolean;
  createError: string;

  isGetLoading: boolean,
  getedOrder: TOrder | null,
  getError: string,

  newOrder: TNewOrder;
};


export type TUserState = {


  user: TUser|  null,
  isAuthChecked: boolean,
  
  isUserLoading: boolean,
  userError:  string,


  isLoginLoading: boolean,
  loginError:  string,

  isRegisterLoading: boolean,
  registerError:  string,

  getedCode: boolean;
  isGetCodeLoading: boolean;
  getCodeError: string;

  resetPassword: boolean;
  isResetPasswordLoading: boolean;
  resetPasswordError: string;
};

export type TOrderHistoryState = {
  wsConnected: boolean;
  messages: IMessage | null;

  error?: Event;
}

export type TOrderFeedState = {
  wsConnected: boolean;
  messages: IMessage  | null;

  error?: Event;
}
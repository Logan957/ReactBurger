import {
  Action,
  AnyAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { store } from "../store";
import { TIngredient } from "./ingredient-types";

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
  createdOrder: boolean;
  isCreateLoading: boolean;
  createError: string;

  newOrder: Array<TIngredient>;
};

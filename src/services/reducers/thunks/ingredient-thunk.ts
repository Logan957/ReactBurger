import { API_URL_INGREDIENTS } from "../../constants/constant";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import {
  getIngredients,
  getIngredientsError,
  getIngridientsLoading,
} from "../slices/ingredient-slice";

export const getIngredientsThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    try {
      dispatch(getIngridientsLoading());
      const response = await fetch(`${API_URL_INGREDIENTS}`);
      response.json().then((data) => {
        if (response.ok) {
          dispatch(getIngredients(data.data));
        } else {
          return Promise.reject(`Ошибка ${response.status}`);
        }
      });
    } catch (error) {
      dispatch(getIngredientsError("Ошибка"));
    }
  };

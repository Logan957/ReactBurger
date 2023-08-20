import { API_URL_INGREDIENTS } from "../../constants/constant";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import { request } from "../../utils";
import {
  getIngredients,
  getIngredientsError,
  getIngridientsLoading,
} from "../slices/ingredient-slice";

export const getIngredientsThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    try {
      dispatch(getIngridientsLoading());
      const response = await request(`${API_URL_INGREDIENTS}`);
      dispatch(getIngredients(response.data));
    } catch (error) {
      dispatch(getIngredientsError("Ошибка"));
    }
  };

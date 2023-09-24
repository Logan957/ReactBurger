import { API_URL_INGREDIENTS } from "../../constants/constant";
import { TIngredient } from "../../types/ingredient-type";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import { request } from "../../utils";
import {
  getIngredients,
  getIngredientsError,
  getIngridientsLoading,
} from "../slices/ingredient-slice";



interface IngredientData {
  success: boolean;
  data: Array<TIngredient>;
}


export const getIngredientsThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    try {
      dispatch(getIngridientsLoading());
      const response = await request<IngredientData> (`${API_URL_INGREDIENTS}`);
      dispatch(getIngredients(response.data));
    } catch (error) {
      dispatch(getIngredientsError("Ошибка"));
    }
  };

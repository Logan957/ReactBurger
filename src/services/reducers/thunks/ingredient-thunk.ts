import { API_URL } from "../../constants/constant";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import {
  setIngredients,
  setIngredientsError,
  setIngridientsLoading,
} from "../slices/ingredient-slice";

export const getIngredients =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    try {
      dispatch(setIngridientsLoading());
      const response = await fetch(`${API_URL}`);
      response.json().then((data) => {
        if (response.ok) {
          console.log(data.data);
          dispatch(setIngredients(data.data));
        } else {
          return Promise.reject(`Ошибка ${response.status}`);
        }
      });
    } catch (error) {
      dispatch(setIngredientsError("Ошибка"));
    } finally {
      dispatch(setIngridientsLoading());
    }
  };

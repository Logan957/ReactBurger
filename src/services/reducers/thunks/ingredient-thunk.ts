import { Dispatch } from 'redux';
import { API_URL } from '../../constants/constant';
import { ThunkAction } from 'redux-thunk';
import {ingredientSlice}  from "../slices/ingredient-slice"
import { TIngridientState } from '../../types/reducer-type';
import { AnyAction } from 'redux';

export const getIngredients = () : ThunkAction<void, TIngridientState, null, AnyAction>  => async (dispatch: Dispatch)=> {

    try {
        dispatch(ingredientSlice.actions.setIsIngridientsLoading(true));
        const response = await fetch(`${API_URL}`);
        response.json().then((data) => {
          if (response.ok) {
            dispatch(ingredientSlice.actions.setCurrentIngredient(data.data));
          } else {
            return Promise.reject(`Ошибка ${response.status}`);
          }
        });
      } catch (error) {
        dispatch(ingredientSlice.actions.setIngredientsError("Ошибка"));
      } finally {
        dispatch(ingredientSlice.actions.setIsIngridientsLoading(false));
      }
  }
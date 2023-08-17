import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TIngridientState } from "../../types/reducer-type";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from "../../types/ingredient-types";

const initialState: TIngridientState = {
  isIngridientsLoading: false,
  ingredients: [],
  ingredientsError: "",

  currentIngridient: null,
};

export const ingredientSlice = createSlice({
  name: SliceNames.INGREDIENTS,
  initialState: initialState,
  reducers: {

      setIsIngridientsLoading (state, action: PayloadAction<boolean>) {
      state.isIngridientsLoading = action.payload
    },


    setIngredients(state, action: PayloadAction<Array<TIngredient>>) {
      state.ingredients = action.payload
    },

    setIngredientsError(state, action: PayloadAction<string>) {
      state.ingredientsError = action.payload
    },


    setCurrentIngredient(state, action: PayloadAction<TIngredient | null>) {
      state.currentIngridient = action.payload
    },
  },
});

export const ingredientReducer = ingredientSlice.reducer;

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TIngredient } from "../../types/ingredient-type";
import { TIngridientState } from "../../types/reducer-type";

export const initialState: TIngridientState = {
  isIngridientsLoading: false,
  ingredients: [],
  ingredientsError: "",

  currentIngridient: null,
};

export const ingredientSlice = createSlice({
  name: SliceNames.INGREDIENTS,
  initialState: initialState,
  reducers: {
    getIngridientsLoading(state: TIngridientState) {
      state.isIngridientsLoading = true;
      state.ingredientsError = "";
    },

    getIngredients(
      state: TIngridientState,
      action: PayloadAction<Array<TIngredient>>
    ) {
      state.isIngridientsLoading = false;
      state.ingredients = action.payload;
    },

    getIngredientsError(
      state: TIngridientState,
      action: PayloadAction<string>
    ) {
      state.isIngridientsLoading = false;
      state.ingredientsError = action.payload;
    },

    setCurrentIngredient(
      state: TIngridientState,
      action: PayloadAction<TIngredient | null>
    ) {
      state.currentIngridient = action.payload;
    },
  },
});

export const {
  getIngridientsLoading,
  getIngredients,
  getIngredientsError,
  setCurrentIngredient,
} = ingredientSlice.actions;

export const ingredientReducer = ingredientSlice.reducer;

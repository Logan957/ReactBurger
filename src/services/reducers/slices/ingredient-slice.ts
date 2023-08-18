import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TIngredient } from "../../types/ingredient-types";
import { TIngridientState } from "../../types/reducer-type";

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
    setIngridientsLoading(state: TIngridientState) {
      state.isIngridientsLoading = true;
      state.ingredientsError = "";
    },

    setIngredients(
      state: TIngridientState,
      action: PayloadAction<Array<TIngredient>>
    ) {
      state.isIngridientsLoading = false;
      state.ingredients = action.payload;
    },

    setIngredientsError(
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
  setIngridientsLoading,
  setIngredients,
  setIngredientsError,
  setCurrentIngredient,
} = ingredientSlice.actions;

export const ingredientReducer = ingredientSlice.reducer;

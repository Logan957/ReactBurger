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

const ingredientSlice = createSlice({
  name: SliceNames.INGREDIENTS,
  initialState: initialState,
  reducers: {
  },
});

export const ingredientReducer = ingredientSlice.reducer;

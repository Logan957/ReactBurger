import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TIngridientState } from "../../types/reducer-type";

const initialState: TIngridientState = {
  isIngridientsLoading: false,
  ingridients: [],
  ingridientsError: "",

  currentIngridient: null,
};

const ingridientSlice = createSlice({
  name: SliceNames.INGRIDIENTS,
  initialState: initialState,
  reducers: {},
});

export const ingridientReducer = ingridientSlice.reducer;

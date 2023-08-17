import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TOrderState } from "../../types/reducer-type";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: TOrderState = {
  isCreateLoading: false,
  createdOrder: false,
  createError: "",

  newOrder: [],
};

const orderSlice = createSlice({
  name: SliceNames.ORDER,
  initialState: initialState,
  reducers: {
  },
});

export const orderReducer = orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TOrderState } from "../../types/reducer-type";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from "../../types/ingredient-type";
import { TNewOrder } from "../../types/order-type";

const initialState: TOrderState = {
  isCreateLoading: false,
  createdOrder: null,
  createError: "",

  newOrder: {
    currentBun : null, 
    ingredients : [],
    totalPrice : 0,
  } as TNewOrder,
};

const orderSlice = createSlice({
  name: SliceNames.ORDER,
  initialState: initialState,
  reducers: {

    createOrderLoading(state: TOrderState) {
      state.isCreateLoading = true;
      state.createError = "";
    },

    createdOrder(
      state: TOrderState,
      action: PayloadAction<number | null>
    ) {
      state.isCreateLoading = false;
      state.createdOrder = action.payload;
    },

    createOrderError(
      state: TOrderState,
      action: PayloadAction<string>
    ) {
      state.isCreateLoading = false;
      state.createError = action.payload;
    },

    addNewIngridient(
      state: TOrderState,
      action: PayloadAction<TIngredient>
    ) {
        state.newOrder?.ingredients.push(action.payload);
    },

    removeIngridient(
      state: TOrderState,
      action: PayloadAction<number>
    ){
      const newIngredients = state.newOrder.ingredients.filter(
        (_, index) => index !== action.payload
      );
      state.newOrder.ingredients = newIngredients;
    },

    setCurrentBun(
      state: TOrderState,
      action: PayloadAction<TIngredient>
    ) {
      state.newOrder.currentBun = action.payload;
    },

    setIngredients(
      state: TOrderState,
      action: PayloadAction<Array<TIngredient>>
    ){
      state.newOrder.ingredients = action.payload;
    },

    setTotalPrice(
      state: TOrderState,
      action: PayloadAction<number>
    ){
      state.newOrder.totalPrice = action.payload;
    },
  },
});

export const {
  createOrderLoading,
  createdOrder,
  createOrderError,
  addNewIngridient,
  removeIngridient,
  setCurrentBun,
  setTotalPrice,
  setIngredients
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;

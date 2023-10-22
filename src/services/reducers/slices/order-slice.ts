import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TOrderState } from "../../types/reducer-type";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from "../../types/ingredient-type";
import { TNewOrder, TOrder } from "../../types/order-type";
import { v4 as uuidv4 } from 'uuid';

export const initialState: TOrderState = {
  isCreateLoading: false,
  createdOrder: null,
  createError: "",

  isGetLoading: false,
  getedOrder: null,
  getError: "",

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

    getOrderError(
      state: TOrderState,
      action: PayloadAction<string>
    ) {
      state.isGetLoading = false;
      state.getError = action.payload;
    },

    getOrderLoading(state: TOrderState) {
      state.isGetLoading = true;
      state.getError = "";
    },

    getedOrder(
      state: TOrderState,
      action: PayloadAction<TOrder>
    ) {
      state.isGetLoading = false;
      state.getedOrder = action.payload;
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
      const newIngridient = {
        ...action.payload,
        uniqueId: uuidv4()
      };
      state.newOrder?.ingredients.push(newIngridient);
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

    
    resetNewOrder(
      state: TOrderState,
    ){
      state.newOrder = {
        currentBun : null, 
        ingredients : [],
        totalPrice : 0,
      };
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
  setIngredients,
  resetNewOrder,
  getOrderError,
  getOrderLoading,
  getedOrder
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

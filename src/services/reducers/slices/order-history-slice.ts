import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TOrderHistoryState } from "../../types/reducer-type";
import { getCurrentTimestamp } from "../../utils";
  
  const initialState: TOrderHistoryState = {
    wsConnected: false,
    messages: null,
  };

const OrderHistorySlice = createSlice({
    name: SliceNames.ORDER_HISTORY,
    initialState: initialState,
    reducers: {

      getMessage(state : TOrderHistoryState, action) {
        state.error = undefined
        state.messages = { ...action.payload, timestamp: getCurrentTimestamp()}
      },

      connectionSuccess(state :TOrderHistoryState) {
        state.error = undefined;
        state.wsConnected = true;
      },

      connectionError(state :TOrderHistoryState , action) {
        state.error = action.payload;
        state.wsConnected = false;
      },

      connectionClosed(state :TOrderHistoryState) {
        state.error = undefined;
        state.wsConnected = false;
      },
    },
  });

  export const {
    getMessage,
    connectionSuccess,
    connectionError,
    connectionClosed,
  } = OrderHistorySlice.actions;
  export const orderHistoryReducer = OrderHistorySlice.reducer;
  
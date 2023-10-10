import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TOrderFeedState } from "../../types/reducer-type";
import { getCurrentTimestamp } from "../../utils";
  
  const initialState: TOrderFeedState = {
    wsConnected: false,
    messages: null,
  };

const OrderFeedSlice = createSlice({
    name: SliceNames.ORDER_FEED,
    initialState: initialState,
    reducers: {

      getMessage(state : TOrderFeedState, action) {
        state.error = undefined
        state.messages = { ...action.payload, timestamp: getCurrentTimestamp()}
      },

      connectionSuccess(state :TOrderFeedState) {
        state.error = undefined;
        state.wsConnected = true;
      },

      connectionError(state :TOrderFeedState , action) {
        state.error = action.payload;
        state.wsConnected = false;
      },

      connectionClosed(state :TOrderFeedState) {
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
  } = OrderFeedSlice.actions;
  export const orderFeedReducer = OrderFeedSlice.reducer;
  
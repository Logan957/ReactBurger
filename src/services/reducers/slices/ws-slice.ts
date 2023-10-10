import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TWSState } from "../../types/reducer-type";
import { getCurrentTimestamp } from "../../utils";
  
  const initialState: TWSState = {
    wsConnected: false,
    messages: null,
  };

const WSSlice = createSlice({
    name: SliceNames.WS,
    initialState: initialState,
    reducers: {

      getMessage(state : TWSState, action) {
        state.error = undefined
        state.messages = { ...action.payload, timestamp: getCurrentTimestamp()}
      },

      connectionSuccess(state :TWSState) {
        state.error = undefined;
        state.wsConnected = true;
      },

      connectionError(state :TWSState , action) {
        state.error = action.payload;
        state.wsConnected = false;
      },

      connectionClosed(state :TWSState) {
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
  } = WSSlice.actions;
  export const WSReducer = WSSlice.reducer;
  
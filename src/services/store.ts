import { configureStore  } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/root-reducer";
import { orderHistorySocketMiddleware } from "./reducers/middleware/orderHistorySocketMiddleware";
import thunkMiddleware from 'redux-thunk';
import { orderFeedSocketMiddleware } from "./reducers/middleware/orderFeedSocketMiddleware";

const middleware = [thunkMiddleware, orderHistorySocketMiddleware(),orderFeedSocketMiddleware()];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
});
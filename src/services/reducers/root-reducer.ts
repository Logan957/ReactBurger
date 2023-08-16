import { combineReducers } from "redux";
import { ingridientReducer, orderReducer } from "./slices/index-slices";

export const rootReducer = combineReducers({
  ingridient: ingridientReducer,
  order: orderReducer,
});

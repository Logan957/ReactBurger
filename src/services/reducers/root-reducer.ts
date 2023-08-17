import { combineReducers } from "redux";
import { ingredientReducer, orderReducer } from "./slices/index-slices";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  order: orderReducer,
});

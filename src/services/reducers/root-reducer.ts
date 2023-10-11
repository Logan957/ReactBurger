import { combineReducers } from "redux";
import { ingredientReducer, orderReducer,userReducer,WSReducer} from "./slices/index-slices";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  WS: WSReducer,
});

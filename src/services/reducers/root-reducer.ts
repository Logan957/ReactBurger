import { combineReducers } from "redux";
import { ingredientReducer, orderReducer,userReducer,orderHistoryReducer} from "./slices/index-slices";
import { orderFeedReducer } from "./slices/order-feed-slice";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  orderHistory: orderHistoryReducer,
  orderFeed: orderFeedReducer,
});

import { configureStore  } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/root-reducer";
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
});
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../Store/createSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: { cart: cartReducer, product: productReducer },
});

export default store;

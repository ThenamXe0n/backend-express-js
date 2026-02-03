import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productSlice";
import CartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    products: ProductReducer,
    myCart: CartReducer,
  },
});

export default store;

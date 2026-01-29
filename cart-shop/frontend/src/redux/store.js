import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productSlice";
const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});

export default store;

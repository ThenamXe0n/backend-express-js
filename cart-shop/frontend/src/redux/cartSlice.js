import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCartAPI,
  getUserCartItemsAPI,
} from "../services/apiCollection";

const initialState = {
  cartItems: [],
  totalItem: 0,
  isloading: true,
};

export const addItemToCartAsync = createAsyncThunk(
  "add item to cart",
  async (itemDetails) => {
    try {
      await addItemToCartAPI(itemDetails);
      return itemDetails;
    } catch (error) {
      return error;
    }
  },
);

export const getUserCartItemsAsync = createAsyncThunk(
  "fetch cart items",
  async () => {
    try {
      const response = await getUserCartItemsAPI();
      return response;
    } catch (error) {
      return error;
    }
  },
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCardReducer: (state, action) => {
      state.cartItems.push(action.payload);
      state.totalItem = state.cartItems.length;
      state.isloading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.isloading = false;
        state.totalItem = state.cartItems.length;
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.isloading = false;
      })

      // ===
      .addCase(getUserCartItemsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getUserCartItemsAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.data;
        state.isloading = false;
        state.totalItem = state.cartItems.length;
      })
      .addCase(getUserCartItemsAsync.rejected, (state, action) => {
        state.isloading = false;
      });
  },
});

export const { addToCardReducer } = CartSlice.actions;

export default CartSlice.reducer;

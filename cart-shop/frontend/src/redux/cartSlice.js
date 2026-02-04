import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCartAPI,
  clearCartAPI,
  getUserCartItemsAPI,
  removeCartItemAPI,
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

export const removeCartItemAsync = createAsyncThunk(
  "cart/remove",
  async (cartId) => {
    try {
      const response = await removeCartItemAPI(cartId);
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const clearCartAsync = createAsyncThunk("cart/clear", async () => {
  try {
    const response = await clearCartAPI();
    return response;
  } catch (error) {
    return error;
  }
});

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
      .addCase(getUserCartItemsAsync.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        let newItemList = state.cartItems.filter(
          (item) => item._id !== action.payload._id,
        );
        state.cartItems = newItemList;
        state.totalItem = newItemList.length;
        state.isloading = false;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.cartItems = [];
        state.totalItem = 0;
      });
  },
});

export const { addToCardReducer } = CartSlice.actions;

export default CartSlice.reducer;

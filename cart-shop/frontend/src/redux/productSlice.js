import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchApprovedProductAPI,
  fetchSingleProductByProductCodeAPI,
} from "../services/apiCollection";

const initialState = {
  productList: [],
  totalProduct: 0,
  isLoading: true,
  selectedProduct: null,
};

export const fetchApprovedProductAsync = createAsyncThunk(
  "product/Get-approvedProduct",
  async () => {
    try {
      let response = await fetchApprovedProductAPI();
      return response;
    } catch (error) {
      console.error(error.message);
    }
  },
);

export const fetchSingleProductByProductCodeAsync = createAsyncThunk(
  "get/singleProduct",
  async (productCode) => {
    try {
      const response = await fetchSingleProductByProductCodeAPI(productCode);
      return response;
    } catch (error) {
      return error;
    }
  },
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApprovedProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.totalProduct = action.payload.total;
      })
      .addCase(fetchApprovedProductAsync.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
        state.totalProduct = 0;
      })
      /// single product thunk
      .addCase(fetchSingleProductByProductCodeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSingleProductByProductCodeAsync.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.selectedProduct = action.payload.data;
        },
      )
      .addCase(fetchSingleProductByProductCodeAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ProductSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApprovedProductAPI } from "../services/apiCollection";

const initialState = {
  productList: [],
  totalProduct: 0,
  isLoading: true,
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
      });
  },
});

export default ProductSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IFilterProduct from "../../../interfaces/IFilterProduct";
import IProduct from "../../../interfaces/IProduct";
import IProductSliceState from "./interfaces";
import IStatus from "../../../interfaces/IStatus";

export const fetchProducts = createAsyncThunk<IProduct[], IFilterProduct>(
  "product/fetchProductsStatus",
  async (params) => {
    const { order, sortBy, category, search, page, limit } = params;
    const url = `https://65b7b40246324d531d55478c.mockapi.io/products?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`;
    const { data } = await axios.get<IProduct[]>(url);
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    status: "loading", //loading | success | error
  } as IProductSliceState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = IStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = IStatus.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = IStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;

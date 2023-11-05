import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, page, limit } = params;
    const url = `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`;
    const { data } = await axios.get(url);
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    items: [],
    status: "loading", //loading | success | error
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

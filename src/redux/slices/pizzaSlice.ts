import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import ICartItem from "../../interfaces/ICartItem";
import IFilterPizza from "../../interfaces/IFilterPizza";
import IPizza from "../../interfaces/IPizza";
import IPizzaSliceState from "../../interfaces/IPizzaSliceState";

export const fetchPizzas = createAsyncThunk<IPizza[], IFilterPizza>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, page, limit } = params;
    const url = `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`;
    const { data } = await axios.get<IPizza[]>(url);
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: <IPizzaSliceState>{
    items: [],
    status: "loading", //loading | success | error
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

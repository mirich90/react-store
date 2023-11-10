import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICartItem from "../../interfaces/ICartItem";
import ICartSliceState from "../../interfaces/ICartSliceState";
import { RootState } from "../store";

export const cartSlice = createSlice({
  name: "cart",
  initialState: <ICartSliceState>{
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    minusItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<ICartItem>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const SelectorCart = (state: RootState) => state.cart;
export const SelectorCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj: ICartItem) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

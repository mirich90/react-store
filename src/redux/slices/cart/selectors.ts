import ICartItem from "../../../interfaces/ICartItem";
import { RootState } from "../../store";

export const SelectorCart = (state: RootState) => state.cart;

export const SelectorCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj: ICartItem) => obj.id === id);

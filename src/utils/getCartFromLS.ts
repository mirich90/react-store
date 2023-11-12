import ICartItem from "../interfaces/ICartItem";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const cart = localStorage.getItem("cart") || "[]";
  const items = JSON.parse(cart) as ICartItem[];
  const totalPrice = calcTotalPrice(items) as number;
  return { items, totalPrice };
};

import ICartItem from "./ICartItem";

interface ICartSliceState {
  items: ICartItem[];
  totalPrice: number;
}

export default ICartSliceState;

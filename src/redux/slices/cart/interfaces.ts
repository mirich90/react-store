import ICartItem from "../../../interfaces/ICartItem";

interface ICartSliceState {
  items: ICartItem[];
  totalPrice: number;
}

export default ICartSliceState;

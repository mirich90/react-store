import IProduct from "../../../interfaces/IProduct";
import IStatus from "../../../interfaces/IStatus";

interface IProductSliceState {
  items: IProduct[];
  status: IStatus;
}

export default IProductSliceState;

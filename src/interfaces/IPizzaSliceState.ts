import IPizza from "./IPizza";
import IStatus from "./IStatus";

interface IPizzaSliceState {
  items: IPizza[];
  status: IStatus;
}

export default IPizzaSliceState;

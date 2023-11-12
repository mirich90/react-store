import IPizza from "../../../interfaces/IPizza";
import IStatus from "../../../interfaces/IStatus";

interface IPizzaSliceState {
  items: IPizza[];
  status: IStatus;
}

export default IPizzaSliceState;

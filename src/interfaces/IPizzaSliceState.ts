import IPizza from "./IPizza";

interface IPizzaSliceState {
  items: IPizza[];
  status: "loading" | "success" | "error";
}

export default IPizzaSliceState;

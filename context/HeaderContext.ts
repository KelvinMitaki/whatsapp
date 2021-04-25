import { AnyAction } from "redux";
import { SetSearchModal } from "../screens/HomeScreen";
import createDataContext from "./createDataContext";

export interface HeaderState {
  showModal: boolean;
}

type Action = SetSearchModal;

interface Ctx {
  state: HeaderState;
  dispatch: React.Dispatch<any>;
}

const headerReducer = (state: HeaderState, action: SetSearchModal): HeaderState => {
  switch (action.type) {
    case "setSearchModal":
      return { ...state, showModal: action.payload };
    default:
      return state;
  }
};
export const { Context, Provider } = createDataContext<Ctx, HeaderState, Action>(headerReducer, {
  showModal: false
});

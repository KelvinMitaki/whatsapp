import { AnyAction } from "redux";
import createDataContext from "./createDataContext";

export interface HeaderState {
  setShowModal: boolean;
}

interface Ctx {
  state: HeaderState;
  dispatch: React.Dispatch<any>;
}

const headerReducer = (state: HeaderState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const { Context, Provider } = createDataContext<Ctx, HeaderState>(headerReducer, {
  setShowModal: false
});

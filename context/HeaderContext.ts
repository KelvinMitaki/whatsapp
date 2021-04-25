import { AnyAction } from "redux";
import createDataContext from "./createDataContext";

interface HeaderState {}

const headerReducer = (state: HeaderState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(headerReducer, { number: 0 });

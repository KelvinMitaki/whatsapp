import { AnyAction } from "redux";

interface State {}

type Action = AnyAction;

const INITIAL_STATE: State = {};

const chatReducer = (state = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};

export default chatReducer;

import React, { useReducer } from "react";
import { AnyAction } from "redux";
type Action = AnyAction;
// @ts-ignore
const createDataContext: <Ctx, State>(
  reducer: React.Reducer<State, Action>,
  initialState: State
) => {
  Provider: React.FC<{}>;
  Context: React.Context<Ctx>;
} = (reducer, initialState) => {
  const Context = React.createContext({});
  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };
  return { Provider, Context };
};
export default createDataContext;

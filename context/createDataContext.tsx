import React, { useReducer } from "react";
import { AnyAction } from "redux";
type InitialState = { [key: string]: any };
type Action = AnyAction;
type Reducer = React.Reducer<InitialState, Action>;
const createDataContext = (reducer: Reducer, initialState: InitialState) => {
  const Context = React.createContext({});
  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };
  return { Provider, Context };
};
export default createDataContext;

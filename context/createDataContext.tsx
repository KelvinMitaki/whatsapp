import React, { useReducer } from "react";
type Actions = { [key: string]: () => void };
type InitialState = { [key: string]: any };
type Reducer = React.Reducer<InitialState, Actions>;
const createDataContext = (reducer: Reducer, actions: Actions, initialState: InitialState) => {
  const Context = React.createContext({});
  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Context.Provider value={{ state }}>{children}</Context.Provider>;
  };
  return { Provider, Context };
};
export default createDataContext;

import { combineReducers } from "redux";
import chatReducer from "./chatReducer";
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";

export default combineReducers({
  chat: chatReducer,
  user: userReducer,
  group: groupReducer
});

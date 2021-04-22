import { ChatState } from "../redux/chatReducer";
import { UserState } from "../redux/userReducer";

export interface Redux {
  chat: ChatState;
  user: UserState;
}

import { ChatState } from "../redux/chatReducer";
import { GroupState } from "../redux/groupReducer";
import { UserState } from "../redux/userReducer";

export interface Redux {
  chat: ChatState;
  user: UserState;
  group: GroupState;
}

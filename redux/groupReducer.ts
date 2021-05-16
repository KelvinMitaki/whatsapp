import { SetIncommingUnread } from "../components/Group/GroupChat";
import { GroupUserTyping, UnreadGroupMsg } from "../interfaces/GroupInterface";
import { SetGroupUserTyping } from "../screens/GroupChatScreen";

export interface GroupState {
  incommingUnread: UnreadGroupMsg[];
  groupUserTypingChats: GroupUserTyping[];
}

type Action = SetIncommingUnread | SetGroupUserTyping;
const INITIAL_STATE: GroupState = {
  incommingUnread: [],
  groupUserTypingChats: []
};
const groupReducer = (state = INITIAL_STATE, action: Action): GroupState => {
  switch (action.type) {
    case "setIncommingUnread":
      return { ...state, incommingUnread: action.payload };
    case "setGroupUserTyping":
      let chats = [...state.groupUserTypingChats];
      const index = chats.findIndex(c => c.groupID === action.payload.groupID);
      if (index !== -1) {
        chats[index] = action.payload;
      } else {
        chats = [action.payload, ...chats];
      }
      return { ...state, groupUserTypingChats: chats };
    default:
      return state;
  }
};

export default groupReducer;

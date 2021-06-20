import { SetIncommingUnread, SetPreviousSelectedGroup } from '../components/Group/GroupChat';
import { FetchUnreadGroupMsgsQuery, GroupTyping } from '../generated/graphql';
import { SetGroupUserTyping } from '../screens/GroupChatScreen';

export interface GroupState {
  incommingUnread: FetchUnreadGroupMsgsQuery['fetchUnreadGroupMsgs'];
  groupUserTypingChats: GroupTyping[];
  previousSelectedGroupIds: string[];
}

type Action = SetIncommingUnread | SetGroupUserTyping | SetPreviousSelectedGroup;
const INITIAL_STATE: GroupState = {
  incommingUnread: [],
  groupUserTypingChats: [],
  previousSelectedGroupIds: [],
};
const groupReducer = (state = INITIAL_STATE, action: Action): GroupState => {
  switch (action.type) {
    case 'setIncommingUnread':
      return { ...state, incommingUnread: action.payload };
    case 'setGroupUserTyping':
      let chats = [...state.groupUserTypingChats];
      const index = chats.findIndex((c) => c.groupID === action.payload.groupID);
      if (index !== -1) {
        chats[index] = action.payload;
      } else {
        chats = [action.payload, ...chats];
      }
      return { ...state, groupUserTypingChats: chats };
    case 'setPreviousSelectedGroup':
      let selectedGroupIds = [...state.previousSelectedGroupIds];
      if (!selectedGroupIds.some((id) => id === action.payload)) {
        selectedGroupIds = [...selectedGroupIds, action.payload];
      }
      return { ...state, previousSelectedGroupIds: selectedGroupIds };
    default:
      return state;
  }
};

export default groupReducer;

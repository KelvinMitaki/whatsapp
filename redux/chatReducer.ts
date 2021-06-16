import { AnyAction } from 'redux';
import { SetShouldScrollToBottomOnNewMessages } from '../components/Chat/Message';
import { SetStarredMsgsInput } from '../components/Home/HomeHeaderRight';
import { messages } from '../data/messages';
import { FetchUsersQuery, UserTyping } from '../generated/graphql';
import { SetMessage } from '../screens/BroadcastScreen';
import { SetPreviousSelectedChat, SetUserTyping } from '../screens/ChatScreen';
import { SetHeaderHeight, SetSearchModal } from '../screens/HomeScreen';
import { ResetContacts } from '../screens/NewGroupInfoScreen';
import { SetContacts } from '../screens/NewGroupScreen';

export interface ChatState {
  Contacts: FetchUsersQuery['fetchUsers'];
  messages: typeof messages;
  indexToAnimate: string | null;
  scaleNum: number;
  headerHeight: number;
  searchModal: boolean;
  typingChats: UserTyping[];
  starredInput: string;
  shouldScrollToBottomOnNewMessages: boolean;
  previousSelectedChatIds: string[];
}

type Action =
  | SetContacts
  | ResetContacts
  | SetMessage
  | SetHeaderHeight
  | SetSearchModal
  | SetUserTyping
  | SetStarredMsgsInput
  | SetShouldScrollToBottomOnNewMessages
  | SetPreviousSelectedChat;

const INITIAL_STATE: ChatState = {
  Contacts: [],
  messages: messages,
  indexToAnimate: null,
  scaleNum: 1,
  headerHeight: 0,
  searchModal: false,
  typingChats: [],
  starredInput: '',
  shouldScrollToBottomOnNewMessages: true,
  previousSelectedChatIds: [],
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case 'setContacts':
      const contactExists = state.Contacts.find((ct) => ct._id === action.payload._id);
      if (contactExists) {
        const newContacts = state.Contacts.filter((ct) => ct._id !== action.payload._id);
        return { ...state, Contacts: newContacts, indexToAnimate: action.payload._id, scaleNum: 0 };
      }
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload],
        indexToAnimate: action.payload._id,
        scaleNum: 1,
      };
    case 'resetContacts':
      return { ...state, Contacts: [] };
    case 'setHeaderHeight':
      return { ...state, headerHeight: action.payload };
    case 'setMessage':
      return { ...state, messages: [action.payload, ...state.messages] };
    case 'setSearchModal':
      return { ...state, searchModal: action.payload };
    case 'setUserTyping':
      let chats = [...state.typingChats];
      const typingChatIndex = chats.findIndex((c) => c.chatID === action.payload.chatID);
      if (typingChatIndex !== -1) {
        chats[typingChatIndex] = action.payload;
      } else {
        chats = [...chats, action.payload];
      }
      return { ...state, typingChats: chats };
    case 'setStarredMsgsInput':
      return { ...state, starredInput: action.payload };
    case 'setShouldScrollToBottomOnNewMessages':
      return { ...state, shouldScrollToBottomOnNewMessages: action.payload };
    case 'setPreviousSelectedChat':
      let selectedChatIds = [...state.previousSelectedChatIds];
      if (!selectedChatIds.find((id) => id === action.payload)) {
        selectedChatIds = [...selectedChatIds, action.payload];
      }
      return { ...state, previousSelectedChatIds: selectedChatIds };
    default:
      return state;
  }
};

export default chatReducer;

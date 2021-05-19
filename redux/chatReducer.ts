import { AnyAction } from "redux";
import { SetShouldScrollToBottomOnNewMessages } from "../components/Chat/Message";
import { SetPreviousSelectedChat } from "../components/Home/ChatComponent";
import { SetStarredMsgsInput } from "../components/Home/HomeHeaderRight";
import { messages } from "../data/messages";
import { Chat, User, UserTyping } from "../interfaces/ChatInterface";
import { SetMessage } from "../screens/BroadcastScreen";
import { SetUserTyping } from "../screens/ChatScreen";
import { SetHeaderHeight, SetSearchModal } from "../screens/HomeScreen";
import { ResetContacts } from "../screens/NewGroupInfoScreen";
import { SetContacts } from "../screens/NewGroupScreen";

export interface ChatState {
  Contacts: User[];
  messages: typeof messages;
  indexToAnimate: string | null;
  scaleNum: number;
  headerHeight: number;
  searchModal: boolean;
  typingChats: UserTyping[];
  starredInput: string;
  shouldScrollToBottomOnNewMessages: boolean;
  previousSelectedChats: Chat[];
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
  starredInput: "",
  shouldScrollToBottomOnNewMessages: true,
  previousSelectedChats: []
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case "setContacts":
      const contactExists = state.Contacts.find(ct => ct._id === action.payload._id);
      if (contactExists) {
        const newContacts = state.Contacts.filter(ct => ct._id !== action.payload._id);
        return { ...state, Contacts: newContacts, indexToAnimate: action.payload._id, scaleNum: 0 };
      }
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload],
        indexToAnimate: action.payload._id,
        scaleNum: 1
      };
    case "resetContacts":
      return { ...state, Contacts: [] };
    case "setHeaderHeight":
      return { ...state, headerHeight: action.payload };
    case "setMessage":
      return { ...state, messages: [action.payload, ...state.messages] };
    case "setSearchModal":
      return { ...state, searchModal: action.payload };
    case "setUserTyping":
      let chats = [...state.typingChats];
      const typingChatIndex = chats.findIndex(c => c.chatID === action.payload.chatID);
      if (typingChatIndex !== -1) {
        chats[typingChatIndex] = action.payload;
      } else {
        chats = [...chats, action.payload];
      }
      return { ...state, typingChats: chats };
    case "setStarredMsgsInput":
      return { ...state, starredInput: action.payload };
    case "setShouldScrollToBottomOnNewMessages":
      return { ...state, shouldScrollToBottomOnNewMessages: action.payload };
    case "setPreviousSelectedChat":
      let selectedChats = [...state.previousSelectedChats];
      if (!selectedChats.find(c => c._id === action.payload._id)) {
        selectedChats = [...selectedChats, action.payload];
      }
      return { ...state, previousSelectedChats: selectedChats };
    default:
      return state;
  }
};

export default chatReducer;

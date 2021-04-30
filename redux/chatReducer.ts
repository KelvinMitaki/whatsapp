import { AnyAction } from "redux";
import { messages } from "../data/messages";
import { User } from "../interfaces/Chat";
import { SetMessage } from "../screens/BroadcastScreen";
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
}

type Action = SetContacts | ResetContacts | SetMessage | SetHeaderHeight | SetSearchModal;

const INITIAL_STATE: ChatState = {
  Contacts: [],
  messages: messages,
  indexToAnimate: null,
  scaleNum: 1,
  headerHeight: 0,
  searchModal: false
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
    default:
      return state;
  }
};

export default chatReducer;

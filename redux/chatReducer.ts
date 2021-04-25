import { AnyAction } from "redux";
import { messages } from "../data/messages";
import { SetMessage } from "../screens/BroadcastScreen";
import { SetHeaderHeight, SetSearchModal } from "../screens/HomeScreen";
import { ResetContacts } from "../screens/NewGroupInfoScreen";
import { SetContacts } from "../screens/NewGroupScreen";

export interface ChatState {
  Contacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
  messages: typeof messages;
  indexToAnimate: number | null;
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
      const contactExists = state.Contacts.find(ct => ct.id === action.payload.id);
      if (contactExists) {
        const newContacts = state.Contacts.filter(ct => ct.id !== action.payload.id);
        return { ...state, Contacts: newContacts, indexToAnimate: action.payload.id, scaleNum: 0 };
      }
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload],
        indexToAnimate: action.payload.id,
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

import { AnyAction } from "redux";
import { Data } from "../components/SelectedContact";
import { messages } from "../data/messages";
import { SetMessage } from "../screens/BroadcastScreen";
import { ResetContacts } from "../screens/NewGroupInfoScreen";
import { SetContacts } from "../screens/NewGroupScreen";
import { SetChecked } from "../screens/SelectContactsScreen";

export interface ChatState {
  Contacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
  messages: typeof messages;
  checked: Data[];
}

type Action = SetContacts | ResetContacts | SetMessage | SetChecked;

const INITIAL_STATE: ChatState = {
  Contacts: [],
  messages: messages,
  checked: []
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case "setContacts":
      const contactExists = state.Contacts.find(ct => ct.id === action.payload.id);
      if (contactExists) {
        const newContacts = state.Contacts.filter(ct => ct.id !== action.payload.id);
        return { ...state, Contacts: newContacts };
      }
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload]
      };
    case "resetContacts":
      return { ...state, Contacts: [] };
    case "setMessage":
      return { ...state, messages: [action.payload, ...state.messages] };
    case "setChecked":
      const items = [...state.checked];
      const itemIndex = state.checked.findIndex(i => i.id === action.payload.id);
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        return { ...state, checked: items };
      }
      return { ...state, checked: [...state.checked, action.payload] };
    default:
      return state;
  }
};

export default chatReducer;

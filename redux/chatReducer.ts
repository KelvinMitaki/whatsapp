import { AnyAction } from "redux";
import { messages } from "../data/messages";
import { ResetContacts } from "../screens/NewGroupInfoScreen";
import { SetContacts } from "../screens/NewGroupScreen";

export interface ChatState {
  Contacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
  messages: typeof messages;
}

type Action = SetContacts | ResetContacts;

const INITIAL_STATE: ChatState = {
  Contacts: [],
  messages: messages
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case "setContacts":
      const contactExists = state.Contacts.find(
        ct => ct.id === action.payload.id
      );
      if (contactExists) {
        const newContacts = state.Contacts.filter(
          ct => ct.id !== action.payload.id
        );
        return { ...state, Contacts: newContacts };
      }
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload]
      };
    case "resetContacts":
      return { ...state, Contacts: [] };
    default:
      return state;
  }
};

export default chatReducer;

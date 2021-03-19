import { AnyAction } from "redux";
import { SetGrpContacts } from "../screens/NewGroupScreen";

export interface ChatState {
  grpContacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

type Action = SetGrpContacts;

const INITIAL_STATE: ChatState = {
  grpContacts: []
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case "setGrpContacts":
      const contactExists = state.grpContacts.find(
        ct => ct.id === action.payload.id
      );
      if (contactExists) {
        const newGrpContacts = state.grpContacts.filter(
          ct => ct.id !== action.payload.id
        );
        return { ...state, grpContacts: newGrpContacts };
      }
      return {
        ...state,
        grpContacts: [...state.grpContacts, action.payload]
      };
    default:
      return state;
  }
};

export default chatReducer;

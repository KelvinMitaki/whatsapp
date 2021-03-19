import { AnyAction } from "redux";
import { SetGrpContacts } from "../screens/NewGroupScreen";

export interface ChatState {
  groupContacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

type Action = SetGrpContacts;

const INITIAL_STATE: ChatState = {
  groupContacts: []
};

const chatReducer = (state = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case "setGrpContacts":
      const contactExists = state.groupContacts.find(
        ct => ct.id === action.payload.id
      );
      if (contactExists) {
        const newGrpContacts = state.groupContacts.filter(
          ct => ct.id !== action.payload.id
        );
        return { ...state, groupContacts: newGrpContacts };
      }
      return {
        ...state,
        groupContacts: [...state.groupContacts, action.payload]
      };
    default:
      return state;
  }
};

export default chatReducer;

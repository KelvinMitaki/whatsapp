import { SetIncommingUnread } from "../components/Group/GroupChat";
import { UnreadGroupMsg } from "../interfaces/GroupInterface";

export interface GroupState {
  incommingUnread: UnreadGroupMsg[];
}

type Action = SetIncommingUnread;
const INITIAL_STATE: GroupState = {
  incommingUnread: []
};
const groupReducer = (state = INITIAL_STATE, action: Action): GroupState => {
  switch (action.type) {
    case "setIncommingUnread":
      return { ...state, incommingUnread: action.payload };
    default:
      return state;
  }
};

export default groupReducer;

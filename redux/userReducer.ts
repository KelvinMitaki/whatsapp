import { AnyAction } from "redux";
import { countries } from "../data/countries";
import { SetCountry } from "../screens/PhoneNumberScreen";

export interface UserState {
  userCountry: typeof countries[0];
}

type Action = SetCountry;

const INITIAL_STATE: UserState = {
  userCountry: countries.find(c => c.name === "Kenya") || countries[0]
};

const userReducer = (state = INITIAL_STATE, action: Action): UserState => {
  switch (action.type) {
    case "setCountry":
      return {
        ...state,
        userCountry: countries.find(c => c.name === action.payload) || countries[0]
      };
    default:
      return state;
  }
};

export default userReducer;

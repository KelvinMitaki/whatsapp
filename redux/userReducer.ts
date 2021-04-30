import { AnyAction } from "redux";
import { SetCountry } from "../components/PhoneNumber/PhoneNumberComponent";
import { countries } from "../data/countries";

export interface UserState {
  userCountry: typeof countries[0] | null;
}

type Action = SetCountry;

const INITIAL_STATE: UserState = {
  userCountry: countries.find(c => c.name === "Kenya") || null
};

const userReducer = (state = INITIAL_STATE, action: Action): UserState => {
  switch (action.type) {
    case "setCountry":
      return {
        ...state,
        userCountry: countries.find(c => c.dial_code === action.payload) || null
      };
    default:
      return state;
  }
};

export default userReducer;

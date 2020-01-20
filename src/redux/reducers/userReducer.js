import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        authenticated: false
      };

    default:
      return state;
  }
}

import { actionTypes } from "../actions/types";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN_USER:
      return action.payload;
    case actionTypes.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};

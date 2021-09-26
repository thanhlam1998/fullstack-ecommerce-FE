import { actionTypes } from "../actions/types";

export const CODReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.COD:
      return action.payload;
    default:
      return state;
  }
};

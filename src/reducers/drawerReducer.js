import { actionTypes } from "../actions/types";

export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_VISIBLE:
      return action.payload;
    default:
      return state;
  }
};

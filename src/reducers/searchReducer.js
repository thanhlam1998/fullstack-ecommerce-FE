import { actionTypes } from "../actions/types";

const initialState = {
  text: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

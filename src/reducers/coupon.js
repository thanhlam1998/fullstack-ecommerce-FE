import { actionTypes } from "../actions/types";

export const couponReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.COUPON_APPLIED:
      return action.payload;
    default:
      return state;
  }
};

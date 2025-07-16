import type { paymentAction } from "../../types/actionTypes";

const initialState = {
  paymentMethod: null,
};

export const paymentReducer = (state = initialState, action: paymentAction) => {
  switch (action.type) {
    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "RESET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: null,
      };

    default:
      return state;
  }
};

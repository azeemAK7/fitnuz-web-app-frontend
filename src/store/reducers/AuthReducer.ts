import type { AuthAction, AuthState } from "../../types/actionTypes";

const user = JSON.parse(localStorage.getItem("auth") ?? "null");

const initialState: AuthState = {
  user: user,
  address: [],
  userSelectedCheckoutAddress: null,
  clientSecret: null,
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: null,
        address: [],
        userSelectedCheckoutAddress: null,
        clientSecret: null,
      };

    case "FETCH_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        address: [...state.address, action.payload],
      };
    case "CHECKOUT_ADDRESS":
      return {
        ...state,
        userSelectedCheckoutAddress: action.payload,
      };

    case "RESET_CHECKOUT_ADDRESS":
      return {
        ...state,
        userSelectedCheckoutAddress: null,
      };

    case "SET_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };

    case "RESET_CLIENT_SECRET":
      return { ...state, clientSecret: null };

    default:
      return state;
  }
};

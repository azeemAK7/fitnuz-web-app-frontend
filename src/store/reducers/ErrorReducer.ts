import type { ErrorAction } from "../../types/actionTypes";

const initialState = {
  isLoading: false,
  btnLoader: false,
  error: null,
  categoryLoading: null,
};

export const errorReducer = (state = initialState, action: ErrorAction) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        btnLoader: false,
        error: null,
      };

    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        btnLoader: false,
        error: action.payload,
      };

    case "CATEGORY_FETCHING":
      return {
        ...state,
        categoryLoading: true,
      };

    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoading: false,
      };

    case "BTN_LOADER":
      return {
        ...state,
        btnLoader: true,
        error: null,
      };
    default:
      return state;
  }
};

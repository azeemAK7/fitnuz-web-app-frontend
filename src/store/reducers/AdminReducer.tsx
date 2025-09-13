import type {
  FetchAdminProductsAction,
  FetchAnalyticsAction,
} from "../../types/actionTypes";

const initialState = {
  analytics: {},
  adminProducts: [],
  adminProductsPagination: {},
};

type AdminAction = FetchAnalyticsAction | FetchAdminProductsAction;

export const AdminReducer = (state = initialState, action: AdminAction) => {
  switch (action.type) {
    case "FETCH_ANALYTICS":
      return {
        ...state,
        analytics: action.payload,
      };

    case "FETCH_ADMIN_PRODUCTS":
      return {
        ...state,
        adminProducts: action.payload,
        adminProductsPagination: {
          ...state.adminProductsPagination,
          pageSize: action.pageSize,
          pageNumber: action.pageNumber,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          isLastPage: action.isLastPage,
        },
      };

    default:
      return state;
  }
};

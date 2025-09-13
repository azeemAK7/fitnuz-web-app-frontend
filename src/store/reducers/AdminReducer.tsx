import type {
  FetchAdminProductsAction,
  FetchAnalyticsAction,
} from "../../types/actionTypes";
import type {
  AnalyticsType,
  PaginationType,
  ProductType,
} from "../../types/common";

interface AdminState {
  analytics: AnalyticsType;
  adminProducts: ProductType[];
  adminProductsPagination: PaginationType | null;
}

const initialState: AdminState = {
  analytics: {
    totalProducts: "0",
    totalOrders: "0",
    totalRevenue: "0",
  },
  adminProducts: [],
  adminProductsPagination: null,
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

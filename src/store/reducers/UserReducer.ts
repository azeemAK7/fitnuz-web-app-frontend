import type { FetchUserOrdersAction } from "../../types/actionTypes";
import type { Order, PaginationType } from "../../types/common";

export interface userOrderState {
  userOrders: Order[];
  pagination: PaginationType | null;
}
const initialState: userOrderState = {
  userOrders: [],
  pagination: null,
};

type userOrderAction = FetchUserOrdersAction;

export const userReducer = (state = initialState, action: userOrderAction) => {
  switch (action.type) {
    case "FETCH_USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
        pagination: {
          ...state.pagination,
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

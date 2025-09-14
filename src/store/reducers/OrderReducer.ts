import type { FetchOrdersAction } from "../../types/actionTypes";
import type { Order, PaginationType } from "../../types/common";

export interface OrderState {
  adminOrders: Order[];
  pagination: PaginationType | null;
}
const initialState: OrderState = {
  adminOrders: [],
  pagination: null,
};

type OrderAction = FetchOrdersAction;

export const orderReducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return {
        ...state,
        adminOrders: action.payload,
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

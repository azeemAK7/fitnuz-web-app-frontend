import type { AddressType, CategoryType, ProductType, User } from "./common";

export interface AuthState {
  user: User | null;
  address: AddressType[];
  userSelectedCheckoutAddress: AddressType | null;
  clientSecret: string | null;
}

export type AuthAction =
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT_USER" }
  | { type: "FETCH_ADDRESS"; payload: AddressType[] }
  | { type: "ADD_ADDRESS"; payload: AddressType }
  | { type: "CHECKOUT_ADDRESS"; payload: AddressType }
  | { type: "RESET_CHECKOUT_ADDRESS" }
  | { type: "SET_CLIENT_SECRET"; payload: string }
  | { type: "RESET_CLIENT_SECRET" };

export interface FetchProductsAction {
  type: "FETCH_PRODUCTS";
  payload: ProductType[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
}

// Action for fetching categories with pagination
export interface FetchCategoryAction {
  type: "FETCH_CATEGORY";
  payload: CategoryType[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
}

export type ErrorAction =
  | { type: "IS_FETCHING" }
  | { type: "IS_SUCCESS" }
  | { type: "IS_ERROR"; payload: string }
  | { type: "CATEGORY_FETCHING" }
  | { type: "CATEGORY_SUCCESS" }
  | { type: "BTN_LOADER" };

export type paymentAction =
  | { type: "ADD_PAYMENT_METHOD"; payload: string }
  | { type: "RESET_PAYMENT_METHOD" };

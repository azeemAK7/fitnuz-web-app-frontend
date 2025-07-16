import type { IconType } from "react-icons/lib";

export interface BackDropProps {
  isOpen: boolean;
}

export interface LoaderProps {
  /** Optional message shown under the spinner */
  text?: string;
}

export interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

export interface AddressType {
  addressId?: number;
  buildingName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  userRoles: string[]; // or a stricter enum type if needed
}

export interface CartItemType {
  productId: number;
  productName: string;
  productDiscription: string;
  productCategory: string;
  productPrice: number;
  specialPrice: number;
  discount: number;
  productQuantity: number;
  image: string;
}

export interface CartItemUpdate {
  productId: number;
  productQuantity: number;
}

export interface ProductType {
  productId: number;
  productName: string;
  image: string;
  productDiscription: string;
  productQuantity: number;
  productPrice: number;
  discount: number;
  specialPrice: number;
}

export interface CartState {
  cart: CartItemType[];
  totalPrice: number;
  cartId: number | null;
}

export type CartAction =
  | { type: "ADD_CART"; payload: CartItemType }
  | { type: "REMOVE_CART_ITEM"; payload: { productId: number } }
  | {
      type: "SAVE_CART_ITEMS";
      payload: { products: CartItemType[]; totalPrice: number; cartId: number };
    }
  | { type: "CLEAR_CART" };

export interface stripeData {
  addressId: number;
  pgName: string;
  pgPaymentId: string;
  pgResponseMessage: string;
  pgStatus: string;
}

export interface ProductCardProps extends ProductType {
  about?: boolean;
}

export interface CategoryType {
  categoryId: number;
  categoryName: string;
}

export interface PaginationType {
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
}

export type ToastType = {
  success: (msg: string) => void;
  error: (msg: string) => void;
};

export type NavigateFunction = (path: string) => void;

export type SetLoader = (isLoading: boolean) => void;
export type ResetForm = () => void;

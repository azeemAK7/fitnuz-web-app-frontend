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

export interface DashboardOverviewProps {
  title: string;
  amount: string | number;
  Icon: IconType;
  revenue?: boolean;
  color?: string;
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

export interface ProductVariantType {
  variantId: number;
  weightLabel: string;
  weightInGrams: number;
  price: number;
  specialPrice: number;
  discount: number;
  stock: number;
}

export interface CartItemType {
  productId: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  specialPrice: number;
  discount: number;
  productStock: number;
  cartQuantity: number;
  image: string;
  variantId: number;
  weightLabel: string;
  variants?: ProductVariantType[];
}

export interface CartItemUpdate {
  productId: number;
  variantId: number;
  productStock: number;
}

export interface ProductType {
  productId: number;
  productCategory?: string;
  productName: string;
  image: string;
  productDescription: string;
  productStock: number;
  productPrice: number;
  discount: number;
  specialPrice: number;
  variants?: ProductVariantType[];
}

export type ProductFormValues = {
  productId?: number;
  productName: string;
  productDescription: string;
  variants: ProductVariantFormValues[];
};

export interface ProductVariantFormValues {
  variantId?: number;
  weightLabel: string;
  weightInGrams: number;
  price: number;
  discount: number;
  stock: number;
}

export type CategoryFormValues = {
  categoryId?: number;
  categoryName: string;
};

export interface CartState {
  cart: CartItemType[];
  totalPrice: number;
  cartId: number | null;
}

export type CartAction =
  | { type: "ADD_CART"; payload: CartItemType }
  | { type: "REMOVE_CART_ITEM"; payload: { variantId: number } }
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
export interface CashOnDeliveryData {
  addressId: number;
  pgName: string;
  pgPaymentId: string;
  pgResponseMessage: string;
  pgStatus: string;
}

export interface StripeCustomer {
  amount: number;
  currency: string;
  email: string;
  name: string;
  address?: AddressType;
  description?: string;
  metadata?: { [key: string]: string };
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

export interface OrderRow {
  id: number;
  email: string;
  totalAmount: number;
  status: string;
  date: string;
  pgStatus: string;
}

export interface AdminProductRow {
  id: number;
  category?: string;
  productName: string;
  description: string;
  productStock: number;
  productPrice: number;
  specialPrice: number;
  discount: number;
  variants: ProductVariantType[];
}

export interface AdminCategoryRow {
  id: number;
  categoryName: string;
}

export type NavigateFunction = (path: string) => void;

export type SetLoader = (isLoading: boolean) => void;
export type ResetForm = () => void;

export interface AnalyticsType {
  totalProducts: string;
  totalOrders: string;
  totalRevenue: string;
}

export interface Order {
  orderId: number;
  email: string;
  orderItems: OrderItem[];
  orderDate: string;
  payment: Payment;
  totalAmount: number;
  orderStatus: string;
  address: string;
}
export interface OrderItem {
  orderItemId: number;
  product: ProductType;
  quantity: number;
  discount: number;
  orderedProductPrice: number;
  weightLabel: string;
}

interface Payment {
  paymentId: number;
  paymentMethod: string;
  pgPaymentId: string;
  pgStatus: string;
  pgResponseMessage: string;
  pgName: string;
}

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./AuthReducer";
import { paymentReducer } from "./PaymentReducer";
import type { CartItemType } from "../../types/common";

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  errors: errorReducer,
  carts: cartReducer,
  payment: paymentReducer,
});

// 2. Export RootState (based on rootReducer, NOT store)
export type RootState = ReturnType<typeof rootReducer>;

// // 3. Load localStorage data
// const user = JSON.parse(localStorage.getItem("auth") ?? "null");
// const cartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]");

// 4. Setup preloadedState
// const preloadedState: Partial<RootState> = {
//   auth: {
//     user,
//     address: [],
//     userSelectedCheckoutAddress: null,
//     clientSecret: null,
//   },
//   carts: {
//     cart: cartItems,
//     totalPrice: 0,
//     cartId: null,
//   },
// };

// 5. Configure store
export const store = configureStore({
  reducer: rootReducer,
  //preloadedState,
});

// 6. Export dispatch type
export type AppDispatch = typeof store.dispatch;

// 7. Debounced localStorage sync
const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const saveCartToLocalStorage = debounce((cart: CartItemType[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}, 300);

store.subscribe(() => {
  const { carts } = store.getState();
  saveCartToLocalStorage(carts.cart);
});

export default store;

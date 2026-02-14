import type { CartAction, CartState } from "../../types/common";

const storedItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]");
// Filter out old localStorage items without variantId
const cartItems = Array.isArray(storedItems)
  ? storedItems.filter((item: { variantId?: number }) => item.variantId)
  : [];

const initialState: CartState = {
  cart: cartItems,
  totalPrice: 0,
  cartId: null,
};

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case "ADD_CART": {
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.variantId === product.variantId
      );

      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.variantId === product.variantId ? product : item
        );
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, product],
        };
      }
    }

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.variantId !== action.payload.variantId
        ),
      };

    case "SAVE_CART_ITEMS":
      return {
        ...state,
        cart: action.payload.products,
        totalPrice: action.payload.totalPrice,
        cartId: action.payload.cartId,
      };
    case "CLEAR_CART":
      return {
        cart: [],
        totalPrice: 0,
        cartId: null,
      };

    default:
      return state;
  }
};

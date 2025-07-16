import type { CartAction, CartState } from "../../types/common";

const cartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]");

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
        (item) => item.productId === product.productId
      );

      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.productId === product.productId ? product : item
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
          (item) => item.productId !== action.payload.productId
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

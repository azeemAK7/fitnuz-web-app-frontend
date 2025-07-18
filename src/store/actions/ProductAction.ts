import api from "../../api/api";
import type {
  AddressType,
  CartItemType,
  CartItemUpdate,
  NavigateFunction,
  ProductType,
  ResetForm,
  SetLoader,
  stripeData,
  ToastType,
} from "../../types/common";
import { getErrorMessage, getFieldErrors } from "../../types/error";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "../../types/formTypes";
import type { AppDispatch, RootState } from "../reducers/store";

export const fetchProducts =
  (queryString = "") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/public/products?${queryString}`);

      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.content,
        pageSize: data.pageSize,
        pageNumber: data.pageNumber,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        isLastPage: data.isLastPage,
      });
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      dispatch({ type: "IS_ERROR", payload: getErrorMessage(error) });
    }
  };

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "CATEGORY_FETCHING" });
    const { data } = await api.get("public/categories");
    dispatch({
      type: "FETCH_CATEGORY",
      payload: data.content,
      pageSize: data.pageSize,
      pageNumber: data.pageNumber,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      isLastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: getErrorMessage(error) });
  }
};

export const addToCart =
  (cartProductId: number, qty = 1, toast: ToastType) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = getState().products;
    const product = products.find((item) => item.productId === cartProductId);
    if (!product) {
      toast.error("Product not found");
      return;
    }

    const { cart } = getState().carts;
    const existingCartItem = cart.find(
      (item: ProductType) => item.productId === cartProductId
    );

    const currentQty = existingCartItem?.productQuantity || 0;
    const totalQty = currentQty + qty;

    if (product.productQuantity >= totalQty) {
      dispatch({
        type: "ADD_CART",
        payload: { ...product, productQuantity: totalQty },
      });
      toast.success(`${product.productName} added to cart`);
      //localStorage.setItem("cartItem", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out Of Stock");
    }
  };

export const increaseCartQty =
  (
    cartItem: CartItemType,
    toast: ToastType,
    currentQuantity: number,
    setCurrentQuantity: (qty: number) => void
  ) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = getState().products;
    const product = products.find(
      (item) => item.productId === cartItem.productId
    );
    if (!product) {
      toast.error("Product not found");
      return;
    }

    const newQty = currentQuantity + 1;
    if (product.productQuantity >= newQty) {
      setCurrentQuantity(newQty);
      dispatch({
        type: "ADD_CART",
        payload: { ...product, productQuantity: newQty },
      });
    } else {
      toast.error("Oops! You've reached the maximum available stock.");
    }
  };

export const decreaseCartQty =
  (cartItem: CartItemType, newQty: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = getState().products;
    const product = products.find(
      (item) => item.productId === cartItem.productId
    );

    dispatch({
      type: "ADD_CART",
      payload: { ...product, productQuantity: newQty },
    });
  };

export const removeCartItem =
  (cartItem: CartItemType, toast: ToastType) => (dispatch: AppDispatch) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: { ...cartItem },
    });
    toast.success(`${cartItem.productName} removed from cart`);
  };

export const authenticateSignInUser =
  (
    sendData: LoginFormValues,
    navigate: NavigateFunction,
    toast: ToastType,
    setLoader: SetLoader,
    reset: ResetForm
  ) =>
  async (dispatch: AppDispatch) => {
    setLoader(true);
    try {
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("SignIn success");
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoader(false);
    }
  };

export const registerUser =
  (
    sendData: RegisterFormValues,
    navigate: NavigateFunction,
    toast: ToastType,
    setLoader: SetLoader,
    reset: ResetForm
  ) =>
  async () => {
    setLoader(true);
    try {
      const { data } = await api.post("/auth/signUp", sendData);
      reset();
      toast.success(`${data?.message}`);
      navigate("/login");
    } catch (error) {
      toast.error(getFieldErrors(error, ["password", "userName", "email"]));
    } finally {
      setLoader(false);
    }
  };

export const logoutUser =
  (navigate: NavigateFunction, toast: ToastType) => (dispatch: AppDispatch) => {
    dispatch({ type: "LOGOUT_USER" });
    toast.success("You have been signed out successfully");
    localStorage.removeItem("auth");
    navigate("/login");
  };

export const addOrUpdateUserAddress =
  (
    sendData: AddressType,
    reset: ResetForm,
    toast: ToastType,
    setOpenAddressModal: (open: boolean) => void,
    address?: AddressType | null
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "BTN_LOADER" });

      if (address?.addressId) {
        await api.put(`/addresses/${address.addressId}`, sendData);
        dispatch(fetchUserAddress());
        toast.success("User address updated successfully");
      } else {
        const { data } = await api.post("/addresses", sendData);
        dispatch({ type: "ADD_ADDRESS", payload: data });
        toast.success("User address added successfully");
      }

      reset();
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      toast.error(getErrorMessage(error));
      dispatch({ type: "IS_ERROR" });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const fetchUserAddress = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/user/addresses");
    dispatch({
      type: "FETCH_ADDRESS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: getErrorMessage(error) });
  }
};

export const setUserCheckoutAddress = (address: AddressType) => {
  localStorage.setItem("userCheckoutAddress", JSON.stringify(address));
  return {
    type: "CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (
    toast: ToastType,
    addressId: number,
    setOpenDeleteModal: (open: boolean) => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "BTN_LOADER" });
      await api.delete(`/addresses/${addressId}`);
      dispatch({ type: "IS_SUCCESS" });
      dispatch(resetUserSelectedCheckoutAddress());
      dispatch(fetchUserAddress());
      toast.success("address deleted successfully");
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: getErrorMessage(error),
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const resetUserSelectedCheckoutAddress = () => {
  return {
    type: "RESET_CHECKOUT_ADDRESS",
  };
};

export const setPaymentMethod = (value: string) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: value,
  };
};

export const savecartItems =
  (cartItems: CartItemUpdate[]) => async (dispatch: AppDispatch) => {
    try {
      await api.post("/carts/updater", cartItems);
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: getErrorMessage(error),
      });
    }
  };

export const getcartItems =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get("/carts/users/cart");
      dispatch({
        type: "SAVE_CART_ITEMS",
        payload: data,
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: getErrorMessage(error),
      });
    }
  };

export const createClientSecret =
  (totalPrice: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: "IS_FETCHING",
      });
      const { data } = await api.post("/order/stripe-client-secret", {
        amount: Number(totalPrice) * 100,
        currency: "INR",
      });

      dispatch({
        type: "SET_CLIENT_SECRET",
        payload: data,
      });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: getErrorMessage(error),
      });
    }
  };

export const stripePaymentConfirmation =
  (
    sendData: stripeData,
    setErrorMesssage: (msg: string) => void,
    setLoadng: SetLoader,
    toast: ToastType
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      setLoadng(true);
      const response = await api.post("/order/users/payments/online", sendData);
      if (response.data) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "RESET_CHECKOUT_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        dispatch(resetClientSecret());
        toast.success("Order Accepted");
      } else {
        setErrorMesssage("Payment Failed. Please try again.");
      }
    } catch {
      setErrorMesssage("Payment Failed. Please try again.");
    } finally {
      setLoadng(false);
    }
  };

export const resetPaymentMethodSelect = () => {
  return {
    type: "RESET_PAYMENT_METHOD",
  };
};

export const resetClientSecret = () => {
  localStorage.removeItem("client-secret");
  return {
    type: "RESET_CLIENT_SECRET",
  };
};

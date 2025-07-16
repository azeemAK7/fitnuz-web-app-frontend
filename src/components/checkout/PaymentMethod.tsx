import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  getcartItems,
  savecartItems,
  setPaymentMethod,
} from "../../store/actions/ProductAction";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { ProductType } from "../../types/common";

const PaymentMethod = () => {
  const { paymentMethod } = useAppSelector((state) => state.payment);
  const { cart } = useAppSelector((state) => state.carts);
  const { error } = useAppSelector((state) => state.errors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cart.length > 0 && !error) {
      const sendCartItems = cart.map((item: ProductType) => {
        return {
          productId: item.productId,
          productQuantity: item.productQuantity,
        };
      });
      dispatch(savecartItems(sendCartItems));
    }
  }, [dispatch]);

  const paymentMethodHandler = (value: string) => {
    dispatch(setPaymentMethod(value));
    dispatch(getcartItems());
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 ">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
      <FormControl>
        <RadioGroup
          aria-label="payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" />}
            label="Stripe"
            className="text-gray-700"
          />
          <FormControlLabel
            value="RazorPay"
            control={<Radio color="primary" />}
            label="RazorPay"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default PaymentMethod;

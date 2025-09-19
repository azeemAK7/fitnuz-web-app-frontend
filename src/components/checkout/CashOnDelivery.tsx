import { Button } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { cashOnDeliveryConfirmation } from "../../store/actions/ProductAction";
import type { AddressType } from "../../types/common";

const CashOnDelivery = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cart } = useAppSelector((state) => state.carts);
  const { paymentMethod } = useAppSelector((state) => state.payment);
  const userCheckoutAddress: AddressType | null = localStorage.getItem(
    "userCheckoutAddress"
  )
    ? JSON.parse(localStorage.getItem("userCheckoutAddress")!)
    : null;

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    localStorage.setItem("payment", "online");
    if (cart && userCheckoutAddress && paymentMethod) {
      if (!userCheckoutAddress || !userCheckoutAddress.addressId) {
        toast.error(
          "Please select a delivery address before proceeding to payment."
        );
        return;
      }
      const sendData = {
        addressId: userCheckoutAddress?.addressId,
        pgName: "Cash on Delivery",
        pgPaymentId: "N/A",
        pgStatus: "pending",
        pgResponseMessage: "Order placed with Cash on Delivery",
      };
      dispatch(
        cashOnDeliveryConfirmation(sendData, setLoading, toast, navigate)
      );
    }
  };

  return (
    <div className="h-94 flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Cash on Delivery
        </h2>
        <p className="text-gray-600 mb-6">
          You can pay in cash when your order is delivered
        </p>
        <Button
          variant="contained"
          color="primary"
          className="w-fit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
};
export default CashOnDelivery;

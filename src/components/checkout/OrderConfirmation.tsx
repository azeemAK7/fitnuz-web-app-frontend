import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "../shared/Skeleton";
import { FaCheckCircle } from "react-icons/fa";
import { stripePaymentConfirmation } from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import ErrorPage from "../shared/ErrorPage";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { AddressType } from "../../types/common";

const OrderConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userCheckoutAddress: AddressType | null = localStorage.getItem(
    "userCheckoutAddress"
  )
    ? JSON.parse(localStorage.getItem("userCheckoutAddress")!)
    : null;

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0
    ) {
      if (!userCheckoutAddress || !userCheckoutAddress.addressId) {
        toast.error(
          "Please select a delivery address before proceeding to payment."
        );
        return;
      }
      const sendData = {
        addressId: userCheckoutAddress?.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast)
      );
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="max-w-xl mx-auto">
          <Skeleton />
        </div>
      ) : (
        <div>
          {errorMessage ? (
            <ErrorPage message={errorMessage} />
          ) : (
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
              <div className="text-green-500 mb-4 flex  justify-center">
                <FaCheckCircle size={64} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase! Your payment was successful, and
                we’re processing your order.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default OrderConfirmation;

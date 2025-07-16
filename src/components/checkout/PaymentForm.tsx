import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import Skeleton from "../shared/Skeleton";

interface PaymentFormProps {
  clientSecret: string | null;
  totalPrice: number;
}

const PaymentForm = ({ clientSecret, totalPrice }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = !stripe || !elements || !clientSecret;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    await elements.submit();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed");
      return false;
    }
  };

  const paymentElementOptions: import("@stripe/stripe-js").StripePaymentElementOptions =
    {
      layout: "tabs",
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl text-black font-semibold mb-4">Payment Form</h2>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button
            className="text-white w-full px-5 py-[10px] bg-black mt-2 mb-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            disabled={!stripe || isLoading}
          >
            {!isLoading
              ? `Pay ₹${Number(totalPrice).toFixed(2)}`
              : "Processing"}
          </button>
        </>
      )}
    </form>
  );
};
export default PaymentForm;

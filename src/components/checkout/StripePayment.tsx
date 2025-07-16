import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { createClientSecret } from "../../store/actions/ProductAction";
import Skeleton from "../shared/Skeleton";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

const StripePayment = () => {
  const dispatch = useAppDispatch();

  const { clientSecret } = useAppSelector((state) => state.auth);
  const { totalPrice } = useAppSelector((state) => state.carts);
  const { isLoading } = useAppSelector((state) => state.errors);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!clientSecret) {
      dispatch(createClientSecret(totalPrice));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};
export default StripePayment;

//  <div className="h-94 flex justify-center items-center">
//       <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
//         <AlertTitle>Stripe Unavailable</AlertTitle>
//         Stripe payment is Unavailable. Please use another payment method
//       </Alert>
//     </div>

import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { fetchUserAddress } from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import Skeleton from "../shared/Skeleton";
import ErrorPage from "../shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import RazorpayPayment from "./RazorpayPayment";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { address, userSelectedCheckoutAddress } = useAppSelector(
    (state) => state.auth
  );
  const { isLoading, error } = useAppSelector((state) => state.errors);

  const { paymentMethod } = useAppSelector((state) => state.payment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !userSelectedCheckoutAddress) {
      toast.error("Please select checkout address before proceeding.");
      return;
    }

    if (activeStep === 1 && (!userSelectedCheckoutAddress || !paymentMethod)) {
      toast.error("Please select payment address before proceeding.");
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ["Address", "Payment method", "Order Summary", "Payment"];
  return (
    <div className="py-12 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Skeleton />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo addresses={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && <OrderSummary />}
          {activeStep === 3 && (
            <>
              {paymentMethod === "Stripe" ? (
                <StripePayment />
              ) : (
                <RazorpayPayment />
              )}
            </>
          )}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-18 bottom-0 bg-gray-50 left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              !!error ||
              (activeStep === 0
                ? !userSelectedCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
            className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white
                       ${
                         !!error ||
                         (activeStep === 0 && !userSelectedCheckoutAddress) ||
                         (activeStep === 1 && !paymentMethod)
                           ? "opacity-60"
                           : ""
                       }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
      {error && <ErrorPage message={error} />}
    </div>
  );
};
export default Checkout;

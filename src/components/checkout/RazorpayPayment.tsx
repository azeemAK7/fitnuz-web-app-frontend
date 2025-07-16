import { Alert, AlertTitle } from "@mui/material";

const RazorpayPayment = () => {
  return (
    <div className="h-94 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Razorpay Unavailable</AlertTitle>
        Razorpay payment is Unavailable. Please use another payment method
      </Alert>
    </div>
  );
};
export default RazorpayPayment;

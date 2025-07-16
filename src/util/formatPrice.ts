export const formatPrice = (amount: number | null | undefined): string => {
  if (amount == null || isNaN(amount)) return "₹0.00";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

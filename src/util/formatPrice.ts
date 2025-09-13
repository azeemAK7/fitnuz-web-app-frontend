export const formatPrice = (amount: number | null | undefined): string => {
  if (amount == null || isNaN(amount)) return "₹0.00";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatRevenue = (value: number | string) => {
  const num = typeof value === "string" ? Number(value) : value;
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return value;
  }
};

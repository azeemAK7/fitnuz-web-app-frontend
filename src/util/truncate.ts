const truncate = (text: string, charLimit: number) => {
  return text.slice(0, charLimit) + "...";
};
export default truncate;

export const formatPriceCalculation = (
  quantity: number | string,
  price: number | string
) => {
  return (Number(quantity) * Number(price)).toFixed(2);
};

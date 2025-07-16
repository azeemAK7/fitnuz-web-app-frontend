import { formatPriceCalculation } from "../../util/truncate";
import type { CartItemType } from "../../types/common";
import { useAppSelector } from "../../hooks/storeHooks";

const OrderSummary = () => {
  const { paymentMethod } = useAppSelector((state) => state.payment);
  const { userSelectedCheckoutAddress } = useAppSelector((state) => state.auth);

  const { cart, totalPrice } = useAppSelector((state) => state.carts);

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
              <p>
                <strong>Building Name: </strong>
                {userSelectedCheckoutAddress?.buildingName}
              </p>
              <p>
                <strong>City: </strong>
                {userSelectedCheckoutAddress?.city}
              </p>
              <p>
                <strong>Street: </strong>
                {userSelectedCheckoutAddress?.street}
              </p>
              <p>
                <strong>State: </strong>
                {userSelectedCheckoutAddress?.state}
              </p>
              <p>
                <strong>Pincode: </strong>
                {userSelectedCheckoutAddress?.pincode}
              </p>
              <p>
                <strong>Country: </strong>
                {userSelectedCheckoutAddress?.country}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
              <div className="space-y-2">
                {cart?.map((item: CartItemType) => (
                  <div key={item?.productId} className="flex items-center">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-12 h-12 rounded mr-4"
                    ></img>
                    <div className="text-gray-500">
                      <p>{item?.productName}</p>
                      <p>
                        {item?.productQuantity} x ₹{item?.specialPrice} = ₹
                        {formatPriceCalculation(
                          item?.productQuantity,
                          item?.specialPrice
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>₹{formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>₹{formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;

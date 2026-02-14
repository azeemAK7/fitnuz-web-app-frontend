import { useEffect } from "react";
import { FaBagShopping, FaBoxOpen } from "react-icons/fa6";
import Loader from "../shared/Loader";
import ErrorPage from "../shared/ErrorPage";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchUserOrders } from "../../store/actions/ProductAction";

const UserOrder = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((state) => state.errors);
  const { userOrders } = useAppSelector((state) => state.user);

  const emptyOrders = !userOrders || userOrders?.length === 0;

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center items-center p-4 mb-2">
        <FaBagShopping size={26} />
        <h1 className="text-slate-800 text-2xl font-bold">Order Details</h1>
      </div>

      {isLoading ? (
        <Loader text="Loading..." />
      ) : emptyOrders ? (
        <div className="flex flex-col items-center justify-center">
          <FaBoxOpen size={50} className="mb-3" />
          <h2 className="text-gray-700 font-semibold text-2xl">
            No Orders Found
          </h2>
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userOrders.map((order) => (
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="mb-2">
                  <div
                    key={order.orderId}
                    className="flex sm:flex-row flex-col sm:justify-between justify-items-start "
                  >
                    <p>
                      <strong>Order Id: </strong>#{order.orderId}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      <span className="font-semibold text-green-600 mx-0.5">
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                  <p>
                    <strong>Email: </strong>
                    {order.email}
                  </p>
                  <p>
                    <strong>Order Date: </strong>
                    {order.orderDate}
                  </p>
                </div>
                <hr className="mt-2 mb-3 text-slate-800" />
                <h2 className="text-lg font-semibold mb-3">Order Items</h2>

                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="flex items-center pb-2"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.productName}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />

                      <div className="flex-1 px-1">
                        <p className="font-semibold">
                          {item.product.productName}
                          {item.weightLabel && (
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              ({item.weightLabel})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.product.productCategory}
                        </p>
                        <p className="text-sm text-gray-800">
                          {item.product.productDescription}
                        </p>

                        <p className="text-sm text-slate-900 mt-0.5">
                          Quantity:{item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{item.orderedProductPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="mt-2 mb-3 text-slate-800" />
                <div className="mt-3">
                  <div className="flex justify-between">
                    <p>
                      <strong>Total Amount: </strong>
                    </p>
                    <span className="font-semibold">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <p>
                    <strong>Payment Method: </strong>
                    {order.payment.pgName}
                  </p>
                  <p>
                    <strong>Payment: </strong>
                    <span
                      className={`${
                        order.payment.pgStatus === "Pending"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.payment.pgStatus}
                    </span>
                  </p>

                  <p>
                    <strong>Address: </strong>
                    {order.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;

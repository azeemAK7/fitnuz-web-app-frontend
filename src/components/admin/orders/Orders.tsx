import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/storeHooks";
import useOrderHook from "../../../hooks/useOrderHook";
import OrderTable from "./OrderTable";
import Loader from "../../shared/Loader";

const Orders = () => {
  useOrderHook();
  const { adminOrders, pagination } = useAppSelector((state) => state.order);
  const { isLoading } = useAppSelector((state) => state.errors);
  const emptyOrders = !adminOrders || adminOrders?.length === 0;

  return (
    <div className="pb-6 pt-20">
      {isLoading ? (
        <Loader text="Loading Orders..." />
      ) : emptyOrders ? (
        <div className="flex flex-col items-center justify-center">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-gray-600 font-semibold text-2xl">
            No Orders Placed Yet
          </h2>
        </div>
      ) : (
        <div>
          <OrderTable adminOrders={adminOrders} pagination={pagination} />
        </div>
      )}
    </div>
  );
};
export default Orders;

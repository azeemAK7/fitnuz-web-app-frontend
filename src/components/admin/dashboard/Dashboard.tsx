import { FaBoxOpen, FaIndianRupeeSign } from "react-icons/fa6";
import DashboardOverview from "./DashboardOverview";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { getAnalytics } from "../../../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import Loader from "../../shared/Loader";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const {
    analytics: { totalProducts, totalOrders, totalRevenue },
  } = useAppSelector((state) => state.admin);
  const { isLoading } = useAppSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loader text="Loading Analytics Data..." />
      ) : (
        <div className="flex flex-col md:flex-row mt-8 lg:justify-between border border-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg">
          <DashboardOverview
            title="Total Products"
            amount={totalProducts}
            Icon={FaBoxOpen}
          />
          <DashboardOverview
            title="Total Orders"
            amount={totalOrders}
            Icon={FaShoppingCart}
          />
          <DashboardOverview
            title="Total Revenue"
            amount={totalRevenue}
            Icon={FaIndianRupeeSign}
            revenue
          />
        </div>
      )}
    </div>
  );
};
export default Dashboard;

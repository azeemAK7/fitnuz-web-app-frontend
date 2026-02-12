import { FaBoxOpen, FaIndianRupeeSign } from "react-icons/fa6";
import DashboardOverview from "./DashboardOverview";
import { FaShoppingCart } from "react-icons/fa";
import React, { useEffect } from "react";
import { getAnalytics } from "../../../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import Loader from "../../shared/Loader";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const {
    analytics: { totalProducts, totalOrders, totalRevenue },
  } = useAppSelector((state) => state.admin);
  const { isLoading, error } = useAppSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  const products = Number(totalProducts) || 0;
  const orders = Number(totalOrders) || 0;
  const revenue = Number(totalRevenue) || 0;

  const pieData = [
    { name: "Products", value: Math.log10(products + 1), actual: products },
    { name: "Orders", value: Math.log10(orders + 1), actual: orders },
    { name: "Revenue (₹)", value: Math.log10(revenue + 1), actual: revenue },
  ];

  const barData = [
    { name: "Products", value: products },
    { name: "Orders", value: orders },
    { name: "Revenue (₹)", value: revenue },
  ];

  const formatTooltip = (
    value: number | string | (number | string)[] | undefined,
    name: string | number | undefined,
    item: { payload?: { name?: string } },
  ): [React.ReactNode, string] => {
    const num = Number(value ?? 0);
    const label = item.payload?.name ?? String(name ?? "");
    if (label === "Revenue (₹)") {
      return [`₹${num.toFixed(2)}`, label];
    }
    return [num, label];
  };

  return (
    <div>
      {isLoading ? (
        <Loader text="Loading Analytics Data..." />
      ) : error ? (
        <div className="mt-8 border border-red-300 rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-600 text-lg font-semibold">
            Failed to load analytics data
          </p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
          <button
            onClick={() => dispatch(getAnalytics())}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row mt-8 lg:justify-between border border-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg">
            <DashboardOverview
              title="Total Products"
              amount={totalProducts}
              Icon={FaBoxOpen}
              color={COLORS[0]}
            />
            <DashboardOverview
              title="Total Orders"
              amount={totalOrders}
              Icon={FaShoppingCart}
              color={COLORS[1]}
            />
            <DashboardOverview
              title="Total Revenue"
              amount={totalRevenue}
              Icon={FaIndianRupeeSign}
              revenue
              color={COLORS[2]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="border border-slate-400 rounded-lg bg-white shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                Analytics Overview
              </h2>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, payload }) =>
                        `${name}: ${name === "Revenue (₹)" ? `₹${payload.actual}` : payload.actual}`
                      }
                    >
                      {pieData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(
                        _value: number | string | (number | string)[] | undefined,
                        name: string | number | undefined,
                        item: { payload?: { name?: string; actual?: number } },
                      ): [React.ReactNode, string] => {
                        const label = item.payload?.name ?? String(name ?? "");
                        const actual = item.payload?.actual ?? 0;
                        if (label === "Revenue (₹)") {
                          return [`₹${actual.toFixed(2)}`, label];
                        }
                        return [actual, label];
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-slate-400 rounded-lg bg-white shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                Analytics Breakdown
              </h2>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={formatTooltip} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {barData.map((_entry, index) => (
                        <Cell
                          key={`bar-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Dashboard;

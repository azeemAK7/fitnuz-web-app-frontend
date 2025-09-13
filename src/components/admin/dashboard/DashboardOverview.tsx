import type { DashboardOverviewProps } from "../../../types/common";
import { formatRevenue } from "../../../util/formatPrice";

const DashboardOverview = ({
  title,
  amount,
  Icon,
  revenue = false,
}: DashboardOverviewProps) => {
  const convertedAmount = revenue ? Number(amount).toFixed(2) : amount;
  return (
    <>
      <div className="xl:w-80 w-full text-center md:text-start px-5 py-8 space-y-4">
        <div className="flex md:justify-start justify-center items-center gap-2">
          <h3 className="uppercase text-2xl text-slate-700 font-semibold">
            {title}
          </h3>
          <Icon className="text-slate-800 text-2xl" />
        </div>
        <h1 className="font-bold text-slate-800 text-3xl">
          {revenue ? "₹" : null}
          {revenue ? formatRevenue(convertedAmount) : convertedAmount}
        </h1>
      </div>
    </>
  );
};
export default DashboardOverview;

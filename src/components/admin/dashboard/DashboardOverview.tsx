import type { DashboardOverviewProps } from "../../../types/common";
import { formatPrice } from "../../../util/formatPrice";

const DashboardOverview = ({
  title,
  amount,
  Icon,
  revenue = false,
  color,
}: DashboardOverviewProps) => {
  return (
    <div className="xl:w-80 w-full text-center md:text-start px-5 py-8 space-y-4">
      <div className="flex md:justify-start justify-center items-center gap-2">
        {color && (
          <span
            className="inline-block w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
        )}
        <h3 className="uppercase text-2xl text-slate-700 font-semibold">
          {title}
        </h3>
        <Icon className="text-2xl" style={{ color: color || "#1e293b" }} />
      </div>
      <h1 className="font-bold text-3xl" style={{ color: color || "#1e293b" }}>
        {revenue ? formatPrice(Number(amount)) : amount}
      </h1>
    </div>
  );
};
export default DashboardOverview;

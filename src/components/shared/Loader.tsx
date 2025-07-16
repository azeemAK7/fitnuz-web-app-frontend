import { RotatingLines } from "react-loader-spinner";
import type { LoaderProps } from "../../types/common";

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center  w-full lg:h-[420px] h-[300px] mt-3">
      <div className="flex flex-col gap-2 items-center justify-center">
        <RotatingLines
          visible={true}
          width="96"
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <p className="text-slate-800 text-2xl">{text ? text : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Loader;

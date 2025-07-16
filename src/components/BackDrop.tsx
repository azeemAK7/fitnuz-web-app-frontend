import type { BackDropProps } from "../types/common";

const BackDrop = ({ isOpen }: BackDropProps) => {
  return (
    <div
      className={`z-20 transition-all duration-200 opacity-60 w-screen h-screen bg-slate-300 fixed ${
        isOpen ? "top-18" : "top-0"
      } left-0`}
    ></div>
  );
};

export default BackDrop;

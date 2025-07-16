import { FaCartShopping } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse pointer-events-none"></div>
        <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-full p-6 shadow-lg">
          <FaCartShopping
            size={64}
            className="text-slate-400 animate-bounce-gentle"
          />
        </div>

        <div className="text-3xl font-bold text-slate-700">
          Your cart is empty
        </div>
        <div className="text-lg text-slate-500 mt-2">
          Add some products to get started
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/product"
          className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition"
        >
          <MdArrowBack size={24} />
          <span className="font-medium">Start Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;

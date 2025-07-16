import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../util/formatPrice";
import { useAppSelector } from "../../hooks/storeHooks";
import type { CartItemType } from "../../types/common";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.carts);
  const totalPrice = cart.reduce(
    (acc: number, cur: CartItemType) =>
      acc + Number(cur?.specialPrice) * Number(cur?.productQuantity),
    0
  );
  if (!cart || cart.length === 0) return <CartEmpty />;

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <MdShoppingCart className="text-gray-700" size={36} />
          Your Cart
        </h1>
        <p className="mb-2 text-lg text-gray-600">All your selected items</p>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-center text-lg text-slate-800">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-800">Total</div>
      </div>

      <div className="space-y-2">
        {cart &&
          cart.length > 0 &&
          cart.map((item: CartItemType) => (
            <CartItem key={item.productId} cartItem={item} />
          ))}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>

          <Link
            className="w-full flex sm:justify-end justify-center "
            to="/checkout"
          >
            <button
              onClick={() => {}}
              className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700  text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500"
            >
              <MdShoppingCart size={20} />
              Checkout
            </button>
          </Link>

          <Link
            className="flex gap-2 items-center mt-2  text-blue-500 hover:text-blue-600"
            to="/product"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;

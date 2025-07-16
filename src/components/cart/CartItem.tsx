import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { formatPrice } from "../../util/formatPrice";
import toast from "react-hot-toast";
import {
  decreaseCartQty,
  fetchProducts,
  increaseCartQty,
  removeCartItem,
} from "../../store/actions/ProductAction";
import truncate from "../../util/truncate";
import { useAppDispatch } from "../../hooks/storeHooks";
import type { CartItemType } from "../../types/common";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentQuantity, setCurrentQuantity] = useState(
    cartItem.productQuantity
  );

  const handeQtyIncrease = (cartItem: CartItemType) => {
    dispatch(
      increaseCartQty(cartItem, toast, currentQuantity, setCurrentQuantity)
    );
  };

  const handleQtyDecrease = (cartItem: CartItemType) => {
    if (currentQuantity > 1) {
      const newQty = currentQuantity - 1;
      setCurrentQuantity(newQty);
      dispatch(decreaseCartQty(cartItem, newQty));
    }
  };

  const handleRemoveCartItem = (cartItem: CartItemType) => {
    dispatch(removeCartItem(cartItem, toast));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border-[1px] border-slate-200 shadow-custom rounded-md  lg:px-4  py-4 p-2">
      <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {truncate(cartItem.productName, 90)}
          </h3>
        </div>
        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={cartItem.image}
            alt={cartItem.productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() => handleRemoveCartItem(cartItem)}
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center font-semibold text-sm lg:tex-[17px] text-slate-600">
        {formatPrice(Number(cartItem.specialPrice))}
      </div>
      <div className="justify-self-center font-semibold text-sm lg:tex-[17px] text-slate-600">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handeQtyIncrease={() => handeQtyIncrease(cartItem)}
          handleQtyDecrease={() => handleQtyDecrease(cartItem)}
        />
      </div>
      <div className="justify-self-center font-semibold text-sm lg:tex-[17px] text-slate-600">
        {formatPrice(Number(cartItem.specialPrice) * Number(currentQuantity))}
      </div>
    </div>
  );
};
export default CartItem;

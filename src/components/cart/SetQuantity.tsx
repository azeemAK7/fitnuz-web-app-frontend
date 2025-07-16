type SetQuantityProps = {
  quantity: number;
  cardCounter: boolean;
  handeQtyIncrease: () => void;
  handleQtyDecrease: () => void;
};
const SetQuantity = ({
  quantity,
  cardCounter,
  handeQtyIncrease,
  handleQtyDecrease,
}: SetQuantityProps) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button
          disabled={quantity <= 1}
          className="border-[1.2px]  border-red-900 px-3 py-1 rounded-md bg-red-500 text-white"
          onClick={handleQtyDecrease}
        >
          -
        </button>
        <div className="text-slate-800">{quantity}</div>
        <button
          className="border-[1.2px] border-green-900 px-3 py-1 rounded-md bg-green-500 text-white"
          onClick={handeQtyIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};
export default SetQuantity;

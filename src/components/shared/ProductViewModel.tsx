import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MdClose, MdDone } from "react-icons/md";
import Status from "./Status";
import { Divider } from "@mui/material";
import type { ProductType, ProductVariantType } from "../../types/common";
import { useState, useEffect } from "react";

interface ProductViewModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductType | null;
  isAvailable: boolean;
}

function ProductViewModel({
  open,
  setOpen,
  product,
  isAvailable,
}: ProductViewModelProps) {
  const { productName, image, productDescription, productPrice, specialPrice, variants } =
    { ...product };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantType | null>(null);

  useEffect(() => {
    if (variants && variants.length > 0) {
      setSelectedVariant(variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [variants]);

  const displayPrice = selectedVariant ? selectedVariant.price : productPrice;
  const displaySpecialPrice = selectedVariant ? selectedVariant.specialPrice : specialPrice;
  const variantAvailable = selectedVariant
    ? selectedVariant.stock > 0
    : isAvailable;

  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/80 transition-opacity " />
        <div className="fixed inset-0 z-10 w-sm mx-auto overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all  w-full"
            >
              <div className="flex justify-center aspect-[3/2]">
                <img
                  className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 rounded-md object-cover"
                  src={image}
                  alt={productName}
                ></img>
              </div>

              <div className="px-6 pt-10 pb-2">
                <DialogTitle
                  as="h1"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 mb-4 text-gray-600"
                >
                  {productName}
                </DialogTitle>

                {variants && variants.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {variants.map((v) => (
                      <button
                        key={v.variantId}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1 text-sm font-semibold rounded-full border transition-colors duration-200 ${
                          selectedVariant?.variantId === v.variantId
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {v.weightLabel}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-1 font-mono">1kg pack</p>
                )}

                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    {displaySpecialPrice && displaySpecialPrice !== displayPrice ? (
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-400 line-through">
                          {Number(displayPrice).toFixed(2)}
                        </span>
                        <span className="sm:text-xl font-semibold text-xl text-slate-700">
                          {Number(displaySpecialPrice).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-xl text-slate-700">
                        {"  "}
                        {Number(displayPrice).toFixed(2)}
                      </span>
                    )}
                    {variantAvailable ? (
                      <Status
                        text="In Stock"
                        icon={MdDone}
                        bg="bg-teal-200"
                        color="text-teal-900"
                      />
                    ) : (
                      <Status
                        text="Out Of Stock"
                        icon={MdClose}
                        bg="bg-rose-200"
                        color="text-rose-700"
                      />
                    )}
                  </div>
                  <Divider />
                  <p>{productDescription}</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 px-6 py-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ProductViewModel;

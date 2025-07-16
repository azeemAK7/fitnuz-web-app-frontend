import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import ProductViewModel from "./ProductViewModel";
import { FaTag } from "react-icons/fa";
import truncate from "../../util/truncate";
import { addToCart } from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks/storeHooks";
import type { ProductCardProps, ProductType } from "../../types/common";

const ProductCard = ({
  productId,
  productName,
  image,
  productDiscription,
  productQuantity,
  productPrice,
  discount,
  specialPrice,
  about = false,
}: ProductCardProps) => {
  const [openProductViewModel, setOpenProductViewModel] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] =
    useState<ProductType | null>(null);
  const isAvailable = !!(productQuantity && Number(productQuantity) > 0);
  const dispatch = useAppDispatch();

  const handleProductView = (product: ProductType) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModel(true);
    }
  };

  const addToCartHandller = (productId: number) => {
    dispatch(addToCart(productId, 1, toast));
  };

  return (
    <div className=" scale-90 border border-gray-900 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
          <FaTag size={12} />
          {discount}% OFF
        </div>
      )}

      <div
        onClick={() => {
          handleProductView({
            productId,
            productName,
            image,
            productDiscription,
            productQuantity,
            productPrice,
            discount,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer object-cover transition-transform  duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        ></img>
      </div>

      <div className="pt-4 px-4">
        <h2
          onClick={() => {
            handleProductView({
              productId,
              productName,
              image,
              productDiscription,
              productQuantity,
              productPrice,
              discount,
              specialPrice,
            });
          }}
          className="mb-2 font-semibold text-lg cursor-pointer"
        >
          {truncate(productName, 20)}
        </h2>

        <div className="flex-grow">
          <p className="text-gray-600 text-sm">
            {truncate(productDiscription, 90)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between mt-4 pb-1">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ₹{Number(productPrice).toFixed(2)}
                </span>
                <span className="font-bold text-xl text-slate-700">
                  ₹{Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-xl text-slate-700">
                {"  "}₹{Number(productPrice).toFixed(2)}
              </span>
            )}
            <button
              onClick={() => addToCartHandller(productId)}
              disabled={!isAvailable || btnLoader}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600 " : "opacity-70"
              } text-white py-2 px-3 rounded-lg flex items-center justify-center transition-colors  duration-300 w-36`}
            >
              <FaCartShopping className="mr-2" />
              {isAvailable ? "Add to cart" : "Stock out"}
            </button>
          </div>
        )}
      </div>

      <ProductViewModel
        open={openProductViewModel}
        setOpen={setOpenProductViewModel}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};
export default ProductCard;

import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import ProductViewModel from "./ProductViewModel";
import { FaTag } from "react-icons/fa";
import truncate from "../../util/truncate";
import { addToCart } from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks/storeHooks";
import type {
  ProductCardProps,
  ProductType,
  ProductVariantType,
} from "../../types/common";

const ProductCard = ({
  productId,
  productName,
  image,
  productDescription,
  productStock,
  productPrice,
  discount,
  specialPrice,
  variants,
  about = false,
}: ProductCardProps) => {
  const [openProductViewModel, setOpenProductViewModel] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] =
    useState<ProductType | null>(null);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantType>(
    variants && variants.length > 0
      ? variants[0]
      : {
          variantId: 0,
          weightLabel: "1kg",
          weightInGrams: 1000,
          price: productPrice,
          specialPrice,
          discount,
          stock: productStock,
        }
  );

  const isAvailable = !!(selectedVariant.stock && Number(selectedVariant.stock) > 0);
  const dispatch = useAppDispatch();

  const handleProductView = (product: ProductType) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModel(true);
    }
  };

  const addToCartHandller = () => {
    dispatch(addToCart(productId, selectedVariant.variantId, 1, toast));
  };

  const currentDiscount = selectedVariant.discount;
  const currentPrice = selectedVariant.price;
  const currentSpecialPrice = selectedVariant.specialPrice;

  return (
    <div className=" scale-90 border border-gray-900 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 flex flex-col relative">
      {currentDiscount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
          <FaTag size={12} />
          {currentDiscount}% OFF
        </div>
      )}

      <div
        onClick={() => {
          handleProductView({
            productId,
            productName,
            image,
            productDescription,
            productStock,
            productPrice,
            discount,
            specialPrice,
            variants,
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

      <div className="pt-4 px-4 flex flex-col flex-1">
        <h2
          onClick={() => {
            handleProductView({
              productId,
              productName,
              image,
              productDescription,
              productStock,
              productPrice,
              discount,
              specialPrice,
              variants,
            });
          }}
          className="font-semibold text-lg cursor-pointer"
        >
          {truncate(productName, 20)}
        </h2>

        {variants && variants.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 my-2">
            {variants.map((v) => (
              <button
                key={v.variantId}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors duration-200 ${
                  selectedVariant.variantId === v.variantId
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

        <div className="flex-grow">
          <p className="text-gray-600 text-sm mb-2">
            {truncate(productDescription, 90)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between mt-auto pb-2">
            {currentSpecialPrice != currentPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ₹{Number(currentPrice).toFixed(2)}
                </span>
                <span className="font-bold text-xl text-slate-700">
                  ₹{Number(currentSpecialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-xl text-slate-700">
                {"  "}₹{Number(currentPrice).toFixed(2)}
              </span>
            )}
            <button
              onClick={() => addToCartHandller()}
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

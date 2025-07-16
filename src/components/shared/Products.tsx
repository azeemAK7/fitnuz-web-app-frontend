import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "./ProductCard";
import Filter from "../products/Filter";
import useProductHook from "../../hooks/useProductHook";
import Loader from "./Loader";
import Paginations from "./Paginations";
import { useAppSelector } from "../../hooks/storeHooks";
import type { ProductType } from "../../types/common";

const Products = () => {
  const { isLoading, error } = useAppSelector((state) => state.errors);

  const { products, pagination } = useAppSelector((state) => state.products);

  useProductHook();

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter />
      {isLoading ? (
        <Loader text="Product is loading..." />
      ) : error ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">{error}</span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item: ProductType, i: number) => (
                <ProductCard key={i} {...item} />
              ))}
          </div>
          <div className="flex justify-center mt-3">
            <Paginations totalPage={pagination?.totalPages ?? 1} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Products;

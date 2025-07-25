import ProductCard from "../shared/ProductCard";
import Banner from "./Banner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions/ProductAction";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { ProductType } from "../../types/common";

const Home = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);
  const { isLoading, error } = useAppSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className=" py-6">
        <Banner />
      </div>
      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
          <span className="text-slate-700">
            Discover our handpicked selection of top-rated items just for you!
          </span>
        </div>
        {isLoading ? (
          <Loader text={"Product is loading..."} />
        ) : error ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">{error}</span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2   gap-y-6 gap-x-6">
            {products &&
              products
                .slice(0, 6)
                .map((item: ProductType, i: number) => (
                  <ProductCard key={i} {...item} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

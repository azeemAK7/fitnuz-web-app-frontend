import Banner from "./Banner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions/ProductAction";
import { useAppDispatch } from "../../hooks/storeHooks";

import CuteCashew from "../../assets/products/CuteCashew.png";
import AlmondCartoon from "../../assets/products/AlmondCartoon.png";
import CheerfulWalnut from "../../assets/products/CheerfulWalnut.png";
import Fig from "../../assets/products/Fig.png";
import Date from "../../assets/products/Dates.png";
import PistachioMascot from "../../assets/products/PistachioMascot.png";
import GoldenRaisin from "../../assets/products/GoldenRaisin.png";
import Hazelnut from "../../assets/products/Hazelnut.png";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();

  // const { products } = useAppSelector((state) => state.products);
  // const { isLoading, error } = useAppSelector((state) => state.errors);

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

        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 space-y-3 gap-y-4 gap-x-3  sm:gap-y-6 sm:gap-x-6">
          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={CuteCashew}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={CheerfulWalnut}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={Date}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={PistachioMascot}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={AlmondCartoon}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110 ">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={GoldenRaisin}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={Fig}
              alt="cashew"
            />
          </div>

          <div className="w-full h-60 sm:h-100 md:h-110">
            <img
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 transform hover:scale-105 rounded-3xl"
              src={Hazelnut}
              alt="cashew"
            />
          </div>

          {/* {products &&
              products
                .slice(0, 6)
                .map((item, i) => <ProductCard key={i} {...item} />)} */}
        </div>

        <div className="flex justify-center items-center">
          <Link to="/product">
            <button
              className="group relative px-8 py-4 
      bg-gradient-to-r from-[#8b6a4e] to-[#6e533d] 
      text-white font-bold rounded-full overflow-hidden 
      transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <span className="relative z-10 text-xl cursor-pointer">
                Shop Now
              </span>

              <div
                className="absolute inset-0 
        bg-gradient-to-r from-[#6e533d] to-[#8b6a4e] 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
              />
            </button>
          </Link>
        </div>

        {/* {isLoading ? (
          <Loader text={"Product is loading..."} />
        ) : error ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">{error}</span>
          </div>
        ) : (
          // <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2   gap-y-6 gap-x-6">
          //   {products &&
          //     products
          //       .slice(0, 6)
          //       .map((item: ProductType, i: number) => (
          //         <ProductCard key={i} {...item} />
          //       ))}
          // </div>

          
        )} */}
      </div>
    </div>
  );
};
export default Home;

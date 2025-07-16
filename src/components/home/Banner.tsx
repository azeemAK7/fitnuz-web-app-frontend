import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Navigation, Autoplay } from "swiper/modules";
import { bannerList } from "../../util/banner";

import { Link } from "react-router-dom";

const Banner = () => {
  const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

  return (
    <div className="py rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        className="banner-swiper"
      >
        {bannerList.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-auto ${colors[i]}`}
            >
              <div className="flex flex-row items-center justify-center flex-wrap p-4 sm:p-8">
                {/* ✅ Desktop Text Section */}
                <div className="hidden sm:block sm:w-1/2 p-6">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-3xl md:text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-medium mt-4 text-base">
                      {item.description}
                    </p>

                    <div className="mt-4 text-white/80 text-sm space-y-1">
                      <p>✓ Fresh & Handpicked</p>
                      <p>✓ Packed with Essential Nutrients</p>
                      <p>✓ Premium Quality Guaranteed</p>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Link
                        className="bg-black/80 hover:bg-black text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        to="/product"
                      >
                        Order Now
                      </Link>

                      <Link
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold border border-white/30 transition-all duration-300"
                        to="/about"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ✅ Mobile: Image + Glassmorphism Text Overlay */}
                <div className="relative block sm:hidden w-full p-2 h-100">
                  <img
                    src={item.image}
                    alt="Banner"
                    className="object-fill w-54 h-56 mx-auto  rounded-3xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl text-white text-sm">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <h1 className="text-xl font-bold mt-1">{item.subtitle}</h1>
                    <p className="mt-2 text-white/90 text-sm">
                      {item.description}
                    </p>

                    <div className="flex justify-center gap-2 mt-3">
                      <Link
                        to="/product"
                        className="bg-black/80 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-black transition"
                      >
                        Order Now
                      </Link>
                      <Link
                        to="/about"
                        className="bg-white/20 border border-white/30 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-white/30 transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ✅ Image Section (for desktop) */}
                <div className="hidden sm:flex sm:w-1/2 justify-center p-4">
                  <img
                    src={item.image}
                    className="object-fill rounded-lg w-80 h-80 md:w-96 md:h-109"
                    alt="Banner"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

// <div className="hidden lg:flex justify-center w-1/2 p-8">
//   <div className="text-center lg:text-left max-w-md">
//     {/* Premium Badge */}
//     <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
//       {item.badge || "Premium Quality"}
//     </div>

//     <h3 className="text-2xl lg:text-3xl text-white font-bold leading-tight">
//       {item.title}
//     </h3>
//     <h1 className="text-4xl lg:text-5xl text-white font-bold mt-2 leading-tight">
//       {item.subtitle}
//     </h1>
//     <p className="text-white/90 font-medium mt-4 text-lg leading-relaxed">
//       {item.description}
//     </p>

//     {/* Dry Fruit Highlights */}

//     <div className="flex flex-col sm:flex-row gap-3 mt-6">
//     </div>
//   </div>
// </div>

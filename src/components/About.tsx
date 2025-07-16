import { FaLeaf } from "react-icons/fa6";
import fitnuzlogoreal from "../assets/sliders/fitnuzlogoreal.png";

const About = () => {
  const stats = [
    { value: "50K+", label: "Happy Customers", icon: "👥" },
    { value: "99.9%", label: "Purity Rate", icon: "✨" },
    { value: "24hr", label: "Fresh Guarantee", icon: "⚡" },
    { value: "100%", label: "Customer Satisfaction", icon: "💚" },
  ];
  return (
    <div
      className=" px-4 py-8 md:px-12  bg-gradient-custom1
"
    >
      <h1 className="text-center text-6xl md:text-8xl font-black text-white mb-12">
        FitNutz
        <span className="block text-5xl md:text-7xl font-light">
          Dry Fruits
        </span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-18 md:gap-5">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-6 py-3 backdrop-blur-sm border border-green-500/30">
            <FaLeaf className="w-6 h-6 text-green-400 mr-3" />
            <span className="text-green-400 font-semibold">Our Story</span>
          </div>
          <p className="text-white text-lg my-4">
            Welcome to <strong>FitNuz</strong>, your trusted destination for
            premium quality dry fruits and nuts. We are passionate about
            providing nature’s most nutritious snacks—sourced with care, packed
            with goodness, and delivered fresh to your doorstep.
          </p>
          <p className="text-white text-lg my-4">
            Every product we offer goes through a rigorous selection process to
            ensure freshness, purity, and taste. We partner with sustainable
            farms and reliable suppliers who share our commitment to quality.
            Our aim is to empower your wellness journey—one bite at a time.
          </p>
          <p className="text-white text-lg my-4">
            At FitNuz, transparency and integrity are at the heart of what we
            do. No additives, no shortcuts— just honest, wholesome food. Whether
            you're a fitness enthusiast, a mindful eater, or someone who simply
            enjoys premium snacking, we’re here to serve you the very best
            nature has to offer.
          </p>
          <p className="text-white text-lg my-4">
            As we grow, our mission remains the same: to make healthy eating
            accessible, enjoyable, and part of your everyday life. Thank you for
            making FitNuz part of your health journey.
          </p>
        </div>

        <div className="w-full md:w-100 md:h-100 mb-6 md:mb-0 lg:mr-18">
          <img
            src={fitnuzlogoreal}
            alt="About Us"
            className="w-full h-106 rounded-lg shadow-lg transform transition-transform duration-150 hover:scale-105"
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-center mx-auto w-fit bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-500/30 mb-8 shadow-md">
          <span className="text-3xl mr-3">⚡</span>
          <span className="text-cyan-300 text-lg sm:text-xl font-semibold tracking-wide">
            Why Choose Us
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="sm:text-3xl text-2xl mb-2">{stat.icon}</div>
              <div className="lg:text-6xl md:text-4xl text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-1">
                {stat.value}
              </div>
              <div className="sm:text-xl text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center mx-auto w-fit bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-500/30 mb-8 shadow-md">
          <span className="text-3xl mr-3">🎯</span>
          <span className="text-green-400 text-lg sm:text-xl  font-semibold">
            Our Mission
          </span>
        </div>
        <h2 className="text-5xl font-semibold text-white mb-8 text-center">
          Shaping the Future of Nutrition
        </h2>

        <p className="text-2xl mb-12 max-w-5xl mx-auto text-gray-300 leading-relaxed text-center">
          To revolutionize healthy snacking through{" "}
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
            innovation, transparency, and sustainability
          </span>{" "}
          — making premium nutrition accessible to everyone, everywhere.
        </p>
      </div>

      {/* <div>
        <h1 className="text-slate-100 text-4xl font-bold text-center ">
          Our Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              productName={product.productName}
              productDiscription={product.description}
              specialPrice={product.specialPrice}
              productPrice={product.price}
              about
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full px-8 py-4 backdrop-blur-sm">
            <FaSprayCanSparkles className="w-6 h-6 mr-3 text-white" />
            <span className="font-semibold text-white">
              100% Natural & Pure
            </span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <span className="font-semibold">Lightning Fast Delivery</span>
          </div>
        </div>
      </div> */}

      <div className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-12 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to the Future of Nutrition
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of health-conscious customers who've already
              discovered the difference! 🌟
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Premium Quality",
                "Lightning Fast",
                "Ultra Pure",
                "Eco-Friendly",
              ].map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20  rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-500/30"
                >
                  <span className="font-semibold text-white">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;

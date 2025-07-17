import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroVideoSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      className="relative w-full h-[100vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background with Parallax Effect */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(1.1) translate(${mousePosition.x * 10}px, ${
            mousePosition.y * 10
          }px)`,
        }}
        src="/videos/a.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-black/50 to-orange-900/60 animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        <div
          className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto text-center shadow-2xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Heading with Gradient Text */}
          <h1 className="drop-shadow-lg text-5xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 animate-pulse leading-tight">
            FitNutz
          </h1>

          {/* Animated Subtitle */}
          <div className="relative mb-8">
            <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide">
              Premium Dry Fruits Delivered To You
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full animate-pulse" />
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["🥜 Premium Quality", "🚚 Fast Delivery", "🌱 100% Natural"].map(
              (feature, i) => (
                <span
                  key={i}
                  className={`px-6 py-3 font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white/90 border border-white/30 text-sm md:text-base transition-all duration-500  hover:bg-white/30 hover:scale-105 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {feature}
                </span>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/home">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoSection;

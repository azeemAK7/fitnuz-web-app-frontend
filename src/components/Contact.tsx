import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaMapMarkedAlt,
  FaPhone,
  FaPaperPlane,
  FaUser,
  FaComment,
} from "react-icons/fa";

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br bg-gradient-custom1">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(148, 163, 184, 0.3) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-8 px-2 sm:px-6 lg:px-8">
        {/* Main Container */}
        <div
          className="w-full max-w-5xl transform perspective-1000"
          style={{
            transform: `rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${
              (mousePosition.x - 50) * 0.1
            }deg)`,
          }}
        >
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-300 via-gray-200 to-slate-400 bg-clip-text text-transparent mb-6 ">
              FitNutz
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Nature's finest selection of premium dry fruits, nuts, and dried
              delicacies. Get in touch for wholesale pricing and custom orders.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-slate-500/25">
              <div className="flex items-center mb-6">
                <FaPaperPlane className="text-3xl text-slate-400 mr-3 animate-bounce" />
                <h2 className="text-2xl font-bold text-white">
                  Place Your Order
                </h2>
              </div>

              <div className="space-y-6 ">
                <div className="relative group">
                  <FaUser className="absolute left-4 top-4 text-slate-400 group-focus-within:text-gray-300 transition-colors duration-300" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name / Business Name"
                    className="w-full bg-gray-800/20 border border-slate-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-slate-400 focus:bg-gray-800/30 transition-all duration-300 hover:bg-gray-800/25"
                  />
                </div>

                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-4 text-slate-400 group-focus-within:text-gray-300 transition-colors duration-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-800/20 border border-slate-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-slate-400 focus:bg-gray-800/30 transition-all duration-300 hover:bg-gray-800/25"
                  />
                </div>

                <div className="relative group">
                  <FaComment className="absolute left-4 top-4 text-slate-400 group-focus-within:text-gray-300 transition-colors duration-300" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Which dry fruits are you interested in? Quantity needed, preferred packaging, etc..."
                    className="w-full bg-gray-800/20 border border-slate-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-slate-400 focus:bg-gray-800/30 transition-all duration-300 hover:bg-gray-800/25 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                    isSubmitted
                      ? "bg-green-600 animate-pulse"
                      : "bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 shadow-lg hover:shadow-slate-500/25"
                  }`}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Order Placed!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaPaperPlane className="mr-2" />
                      Get Quote
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="max-w-7xl mx-auto">
                <div className="bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-500/20 transform hover:scale-105 transition-all duration-500 hover:shadow-slate-500/25">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <FaPhone className="mr-3 text-slate-400" />
                    Contact Our Store
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center p-4 bg-gray-800/10 rounded-2xl hover:bg-gray-800/20 transition-all duration-300 transform hover:translate-x-2 border border-slate-500/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <FaPhone className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Store Phone</p>
                        <p className="text-white font-semibold">+91xxxxx</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-800/10 rounded-2xl hover:bg-gray-800/20 transition-all duration-300 transform hover:translate-x-2 border border-slate-500/10">
                      <div className="w-12  h-12 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center mr-4 shadow-lg px-4">
                        <FaMapMarkedAlt className="text-white text-lg" />
                      </div>
                      <div className="flex-1 break-all">
                        <p className="text-gray-300 text-sm">Email Orders</p>
                        <p className="text-white font-semibold sm:text-md text-sm">
                          abdulkhaderazeem7666gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center py-4 pl-4 bg-gray-800/10 rounded-2xl hover:bg-gray-800/20 transition-all duration-300 transform hover:translate-x-2 border border-slate-500/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center mr-4 shadow-lg px-4">
                        <FaMapMarkedAlt className="text-white text-lg" />
                      </div>
                      <div className="flex-1 break-words">
                        <p className="text-gray-300 text-sm">Store Location</p>
                        <p className="text-white font-semibold sm:text-md sm:text-md text-sm">
                          Mm Traders, Model Colony, Dr.Ambedkar Nagar,
                          Yeswanthpur, Bangalore
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-slate-600/20 to-gray-600/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-slate-300/20 transform hover:scale-105 transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Why Choose Our Dry Fruits?
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mr-3 animate-pulse"></div>
                      <span>Premium Quality Selection</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full mr-3 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <span>Fresh & Natural Products</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 bg-slate-300 rounded-full mr-3 animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span>Wholesale Pricing Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Contact;

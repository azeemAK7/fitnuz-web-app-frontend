import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";
import type { RootState } from "../../store/reducers/store";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { cart } = useSelector((state: RootState) => state.carts);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="h-[70px] bg-black text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[Poppins]">FitNutz</span>
        </Link>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-black   text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`
                ${
                  path === "/home"
                    ? "text-white font-semibold underline decoration-gray-600 decoration-2 underline-offset-4"
                    : "text-gray-200"
                }
                `}
              to={"/home"}
            >
              Home
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`
                ${
                  path === "/product"
                    ? "text-white font-semibold underline decoration-gray-600 decoration-2 underline-offset-4"
                    : "text-gray-200"
                }
                `}
              to={"/product"}
            >
              Products
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`
                ${
                  path === "/about"
                    ? "text-white font-semibold underline decoration-gray-600 decoration-2 underline-offset-4"
                    : "text-gray-200"
                }
                `}
              to={"/about"}
            >
              About
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`
                ${
                  path === "/contact"
                    ? "text-white font-semibold underline decoration-gray-600 decoration-2 underline-offset-4"
                    : "text-gray-200"
                }
                `}
              to={"/contact"}
            >
              Contact
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`
                ${
                  path === "/cart"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }
                `}
              to={"/cart"}
            >
              <Badge
                showZero
                badgeContent={cart?.length || 0}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <FaShoppingCart size={25} />
              </Badge>
            </Link>
          </li>

          {user && user.id ? (
            <li className="font-[500] transition-all duration-150 ">
              <UserMenu />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
              <Link
                className="flex items-center space-x-2 px-4 py-[6px] 
                            bg-gradient-to-r from-purple-600 to-red-500 
                            text-white font-semibold rounded-md shadow-lg 
                            hover:from-purple-500 hover:to-red-400 transition 
                            duration-300 ease-in-out transform "
                to="/login"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};
export default Navbar;

import { FaHome, FaShoppingCart, FaThList } from "react-icons/fa";
import { FaBoxOpen, FaStore } from "react-icons/fa6";

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FaHome,
    current: true,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaThList,
  },
  {
    name: "Sellers",
    href: "/admin/sellers",
    icon: FaStore,
    current: true,
  },
];

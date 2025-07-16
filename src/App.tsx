import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import Products from "./components/shared/Products";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import HeroVideoSection from "./components/home/HeroVideoSection";
import OrderConfirmation from "./components/checkout/OrderConfirmation";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/"];

  const shouldNavBarOpen = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <>
      {shouldNavBarOpen && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<HeroVideoSection />} />

        <Route element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<OrderConfirmation />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

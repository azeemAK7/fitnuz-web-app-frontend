import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHooks";

const PrivateRoute = ({ publicPage = false }) => {
  const { user } = useAppSelector((state) => state.auth);
  if (publicPage) {
    return user ? <Navigate to="/home" /> : <Outlet />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

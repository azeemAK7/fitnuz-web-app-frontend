import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHooks";

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user && user?.userRoles?.includes("ROLE_ADMIN");
  if (publicPage) {
    return user ? <Navigate to="/home" /> : <Outlet />;
  }
  if (adminOnly) {
    if (!isAdmin) {
      return <Navigate to="/home" />;
    }
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

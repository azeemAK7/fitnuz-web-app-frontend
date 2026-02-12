import { FaUser, FaEnvelope, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHooks";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const isAdmin = user.userRoles?.includes("ROLE_ADMIN");

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-10 flex flex-col items-center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: 36,
                bgcolor: "#ffffff",
                color: "#111827",
                fontWeight: "bold",
              }}
            >
              {user.userName?.charAt(0).toUpperCase()}
            </Avatar>
            <h1 className="text-white text-2xl font-bold mt-4">
              {user.userName}
            </h1>
            {isAdmin && (
              <span className="mt-2 inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-sm font-medium px-3 py-1 rounded-full border border-amber-500/30">
                <FaShieldAlt />
                Admin
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-gray-900 text-white p-3 rounded-full">
                <FaUser />
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.userName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-gray-900 text-white p-3 rounded-full">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-gray-900 text-white p-3 rounded-full">
                <FaShieldAlt />
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-800">
                  {isAdmin ? "Admin" : "Customer"}
                </p>
              </div>
            </div>

            <Link
              to="/profile/orders"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="bg-gray-900 text-white p-3 rounded-full">
                <FaShoppingCart />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">My Orders</p>
                <p className="text-lg font-semibold text-gray-800">
                  View order history
                </p>
              </div>
              <span className="text-gray-400 text-xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 🧼 Remove stored auth data
      localStorage.removeItem("auth");

      // 🚪 Redirect to login
      window.location.href = "/login";
      toast.success("You have  been logged out!");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default api;

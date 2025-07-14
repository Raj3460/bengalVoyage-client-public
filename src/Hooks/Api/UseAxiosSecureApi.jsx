import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxiosSecureApi = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      console.log("inside res interceptor", status);

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => navigate("/login"))
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecureApi;

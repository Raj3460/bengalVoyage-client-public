import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bengal-voyage-server.vercel.app",
});

const UseAxiosSecureApi = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.accessToken) {
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseInterceptor = axiosSecure.interceptors.response.use(
        (res) => res,
        (error) => {
          const status = error.response?.status;
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

      // Cleanup interceptor on unmount
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user?.accessToken, navigate, logout]);

  return axiosSecure;
};

export default UseAxiosSecureApi;

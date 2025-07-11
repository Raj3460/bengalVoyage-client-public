import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxiosSecureApi = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("inside res interceptor", error.status);

      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecureApi;

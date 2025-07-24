import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: 'https://bengal-voyage-server.vercel.app',

});

const useAxiosApi = () => {
       return axiosInstance
};

export default useAxiosApi;
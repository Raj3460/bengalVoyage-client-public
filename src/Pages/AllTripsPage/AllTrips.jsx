import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecureApi from '../../Hooks/Api/UseAxiosSecureApi';
import PackageCard from '../Home/TourismAndTravel/PackageCard';
import ScrollToTop from '../../Component/ScrollToTop';

const AllTrips = () => {
  const axiosSecure = UseAxiosSecureApi();
  
  // Fetch packages
  const { 
    data: packages = [], 
    isLoading, 
    isError,
    error 
  } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/packages');
      return res.data;
    }
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading packages: {error.message}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollToTop /> 
      <h1 className="text-3xl font-bold text-center mb-8">Our Tour Packages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};



export default AllTrips;
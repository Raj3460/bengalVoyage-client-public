import React from "react";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import TouristDashboardHome from "./TouristDashboardHome";
import GuideDashboardHome from "./GuideDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardLayoutHomePage = () => {
  const axiosSecure = UseAxiosSecureApi();
  const { user } = useAuth();
  const {
    data: currentUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  const role = currentUser.role;
  console.log(role);
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
     
      
      {role === "tourist" &&  <TouristDashboardHome></TouristDashboardHome>}
      {role === "tour-guide"  &&  <TouristDashboardHome></TouristDashboardHome>}
      {/* {role === "tour-guide" && <GuideDashboardHome />} */}
      {role === "admin" && <AdminDashboardHome />}
    </div>
  );
};

export default DashboardLayoutHomePage;

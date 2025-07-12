import React from "react";
import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../Hooks/useAuth";
// import UseAxiosSecureApi from "../../Hooks/Api/UseAxiosSecureApi";
import useAuth from "./useAuth";
import UseAxiosSecureApi from "./Api/UseAxiosSecureApi";

const useUsersRoles = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = UseAxiosSecureApi();
  const {
    data: role = "tourist",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });
  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUsersRoles;

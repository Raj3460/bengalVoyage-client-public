// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../Hooks/useAuth";
// import UseAxiosSecureApi from "../../Hooks/Api/UseAxiosSecureApi";

// const UseUserRole = () => {
//   const { user, loading: authLoading } = useAuth();
//   const axiosSecure = UseAxiosSecureApi();

//   const {
//     data: currentUser = {},
//     isLoading: userLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["currentUser", user?.email],
//     enabled: !authLoading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user.email}`);
//       return res.data;
//     },
//   });

//   // Extract role from currentUser with default fallback
//   const role = currentUser?.role || "tourist";

//   return { 
//     role,
//     currentUser, // Return full user data if needed
//     roleLoading: authLoading || userLoading,
//     isError,
//     error,
//     refetch 
//   };
// };

// export default UseUserRole;
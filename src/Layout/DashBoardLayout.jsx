import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaSearch,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaBook,
  FaPlus,
  FaUsers,
  FaClipboardList,
  FaSuitcase,
  FaUserTie,
  FaUserCog
} from "react-icons/fa";
import Logo from "../Component/Logo/Logo";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Component/Sheard/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecureApi from "../Hooks/Api/UseAxiosSecureApi";

const DashBoardLayout = () => {
  const { user, loading } = useAuth();
  // const { roleLoading, role } = useUsersRoles();
  const axiosSecure = UseAxiosSecureApi()
  
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
  const role = currentUser.role
  console.log(role);


  useEffect(() => {
    if (!isLoading && role && !sessionStorage.getItem("dashboardReloaded")) {
      sessionStorage.setItem("dashboardReloaded", "true");
      window.location.reload();
    }
  }, [isLoading, role]);

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="drawer lg:drawer-open  left-0 z-50">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar  lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold">Dashboard</div>
        </div>

        <div className="flex-1 p-4 bg-base-100">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <div className="menu bg-base-200 text-base-content w-80 min-h-full flex flex-col">
          <div className="p-4 mb-4 border-b border-base-300">
            <Logo />
          </div>

          <ul className="flex-1 px-2 space-y-1">
            <li>
              <NavLink to="" end className="flex items-center gap-3">
                <FaHome className="text-lg" />
                Dashboard Home
              </NavLink>
            </li>

            <li>
              <NavLink to="manage_profile" className="flex items-center gap-3">
                <FaUserCog className="text-lg" />
                Manage Profile
              </NavLink>
            </li>

            {role === 'tourist' && (
              <>
                <li>
                  <NavLink to="my_bookings" className="flex items-center gap-3">
                    <FaSuitcase className="text-lg" />
                    My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="join_as_tour_guide" className="flex items-center gap-3">
                    <FaUserTie className="text-lg" />
                    Join as Tour Guide
                  </NavLink>
                </li>
              </>
            )}

            {(role === 'tourist' || role === 'tour-guide') && (
              <>
                <li>
                  <NavLink to="add_story" className="flex items-center gap-3">
                    <FaPlus className="text-lg" />
                    Add Story
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manage_story" className="flex items-center gap-3">
                    <FaBook className="text-lg" />
                    Manage Stories
                  </NavLink>
                </li>
              </>
            )}

            {role === 'tour-guide' && (
              <>
                <li>
                  <NavLink to="assign_tours" className="flex items-center gap-3">
                    <FaClipboardList className="text-lg" />
                    My Assigned Tours
                  </NavLink>
                </li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li>
                  <NavLink to="add_package" className="flex items-center gap-3">
                    <FaPlus className="text-lg" />
                    Add Package
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manage_users" className="flex items-center gap-3">
                    <FaUserShield className="text-lg" />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manage_candidates" className="flex items-center gap-3">
                    <FaUserCheck className="text-lg" />
                    Manage Candidates
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="p-4 border-t border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || '/default-user.png'} alt="User" />
                </div>
              </div>
              <div>
                <p className="font-medium">{user?.displayName || 'User'}</p>
                <p className="text-sm opacity-70 capitalize">{role || 'user'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;

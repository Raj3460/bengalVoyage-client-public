import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link } from "react-router"; // ✅ ঠিক করা হয়েছে
import UseAxiosSecureApi from "../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../Sheard/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";

const Profile = ({ handleLogOut }) => {
  const axiosSecure = UseAxiosSecureApi();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner size="small" />;
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none transition-transform hover:scale-105"
        aria-label="User menu"
      >
        <img
          src={currentUser?.image || "/default-profile.png"}
          alt="User profile"
          className="w-10 h-10 rounded-full border-2 border-primary object-cover ring-2 ring-accent hover:ring-secondary transition-all"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Box */}
          <div className="absolute right-0 mt-2 w-64 bg-base-300 rounded-lg shadow-xl py-1 z-40 border border-accent">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-accent bg-gradient-to-r from-primary/10 to-secondary/10">
              <p className="text-sm font-semibold text-primary truncate">
                {currentUser?.name || "User"}
              </p>
              <p className="text-xs text-accent truncate">
                {currentUser?.email || "No email"}
              </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 p-2">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary/10 group transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaTachometerAlt className="mr-3 text-primary" />
                <span className=" group-hover:text-primary">
                  Dashboard
                </span>
              </Link>

              <Link
                to="/allTrips"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary/10 group transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaBell className="mr-3 text-secondary" />
                <span className=" group-hover:text-secondary">
                  Packages
                </span>
              </Link>

              <Link
                to="/dashboard/manage_profile"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent/10 group transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-3 text-accent" />
                <span className=" group-hover:text-accent">
                  My Profile
                </span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-accent/30 p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogOut();
                }}
                className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md hover:bg-error/10 group transition-colors"
              >
                <FaSignOutAlt className="mr-3 text-error" />
                <span className=" group-hover:text-red-500">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

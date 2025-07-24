import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import EditProfileModal from "./EditProfileModal";

import {
  FaUser,
  FaUserTie,
  FaUserShield,
  FaEdit,
  FaChartLine,
  FaArrowRight,
  FaMapMarkedAlt,
  FaBookOpen,
} from "react-icons/fa";
import { MdEmail, MdAdminPanelSettings } from "react-icons/md";
// import AdminDashboardHome from "../AdminDashboardHome/AdminDashboardHome";

const StatCard = ({ title, value, icon, color }) => (
  <div className={`p-5 rounded-xl shadow-md ${color.bg} ${color.text} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl p-3 rounded-full bg-white bg-opacity-30">{icon}</div>
    </div>
  </div>
);

const ManageProfile = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecureApi();
  const [isOpen, setIsOpen] = useState(false);

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

  const { data: adminStats = {} } = useQuery({
    queryKey: ["adminStats"],
    enabled: currentUser?.role === "admin",
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });
console.log(adminStats);

















  if (isLoading) return <LoadingSpinner size="small" />;

  const roleIcon = {
    admin: <FaUserShield className="text-purple-600 text-xl" />,
    "tour-guide": <FaUserTie className="text-blue-600 text-xl" />,
    tourist: <FaUser className="text-yellow-600 text-xl" />,
  };

  const roleLabel = {
    admin: "Admin",
    "tour-guide": "Tour Guide",
    tourist: "Tourist",
  };

  return (
    <div className=" px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg">
        <div className="flex items-start gap-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={currentUser?.image || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow">
              {roleIcon[currentUser?.role]}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {currentUser?.name || "User"}
            </h1>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 shadow-sm">
              {roleIcon[currentUser?.role]}
              <span className="ml-2">{roleLabel[currentUser?.role]}</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-center">
              <MdEmail className="mr-2 text-indigo-500 dark:text-indigo-400" />
              {currentUser?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Tourist CTA */}
      {currentUser?.role === "tourist" && (
        <div className="relative z-0  bg-gradient-to-r from-yellow-50 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-900/20 p-6 rounded-2xl mb-10 overflow-hidden shadow">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20"></div>
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-yellow-300 dark:bg-yellow-700 rounded-full opacity-20"></div>
          <div className="relative z-0">
            <h3 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              Ready for a new adventure?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-lg">
              Turn your passion for travel into a profession. Apply to become a certified tour guide and start creating unforgettable experiences for fellow travelers.
            </p>
            <Link to="/dashboard/join_as_tour_guide">
              <button  className="flex items-center px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Apply As a Tour Guide <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {currentUser?.role === "admin" && (
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 mr-4">
              <MdAdminPanelSettings className="text-2xl text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Admin Dashboard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
            <StatCard
              title="Total Revenue"
              value={`৳${adminStats?.data?.totalPayments?.toLocaleString() || 0}`}
              icon={<FaChartLine className="text-blue-500" />}
              color={{ bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-200" }}
            />
            <StatCard
              title="Tour Guides"
              value={(adminStats?.data?.totalGuides || 0).toLocaleString()}
              icon={<FaUserTie  className="text-yellow-400"/>}
              color={{ bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-200" }}
            />
            <StatCard
              title="Packages"
              value={(adminStats?.data?.totalPackages || 0).toLocaleString()}
              icon={<FaMapMarkedAlt />}
              color={{ bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-200" }}
            />
            <StatCard
              title="Tourists"
              value={(adminStats?.data?.totalTourists || 0).toLocaleString()}
              icon={<FaUser />}
              color={{ bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-800 dark:text-purple-200" }}
            />
            <StatCard
              title="Travel Stories"
              value={(adminStats?.data?.totalStories || 0).toLocaleString()}
              icon={<FaBookOpen />}
              color={{ bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-800 dark:text-pink-200" }}
            />
          </div>
        </div>
        // <AdminDashboardHome></AdminDashboardHome>
      )}


      

      {/* Account Info Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              BASIC INFORMATION
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {currentUser?.name || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {currentUser?.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Account Type</p>
                <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                  {roleIcon[currentUser?.role]}
                  <span className="ml-2">{roleLabel[currentUser?.role]}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              ACCOUNT DETAILS
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Member Since</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(currentUser?.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Account Status</p>
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  Active
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(currentUser?.updated_at || currentUser?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOpen && (
        <EditProfileModal
          user={currentUser}
          setIsModalOpen={setIsOpen}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageProfile;
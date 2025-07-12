import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { 
  FaUser, 
  FaUserTie, 
  FaUserShield, 
  FaEdit, 
  FaArrowRight, 
  FaMoneyBillWave, 
  FaUsers, 
  FaBoxOpen, 
  FaBook, 
  FaEnvelope 
} from "react-icons/fa";
// import EditProfileModal from "./EditProfileModal";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import useUsersRoles from "../../../Hooks/useUsersRoles";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";

// Define StatCard component outside the main component
const StatCard = ({ icon, title, value, trend, trendValue, bgColor }) => (
  <div className={`${bgColor} p-5 rounded-xl shadow-sm`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-white dark:bg-gray-700 shadow">
        {icon}
      </div>
    </div>
    {trend && (
      <div className={`mt-3 text-xs font-medium ${
        trend === 'up' ? 'text-green-500' : 
        trend === 'down' ? 'text-red-500' : 'text-gray-500'
      }`}>
        {trendValue && <span>{trendValue} {trend === 'up' ? '↑' : '↓'}</span>}
        {!trendValue && trend === 'steady' && 'Steady'}
      </div>
    )}
  </div>
);

// Define InfoItem component
const InfoItem = ({ label, value, status }) => (
  <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`font-medium ${
      status === 'active' ? 'text-green-600 dark:text-green-400' : 
      'text-gray-800 dark:text-gray-200'
    }`}>
      {value}
      {status === 'active' && (
        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
      )}
    </p>
  </div>
);

const ManageProfile = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecureApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role } = useUsersRoles();

  const { data: currentUser = {}, isLoading, refetch } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    enabled: role === "admin",
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading || (role === "admin" && statsLoading)) {
    return <LoadingSpinner size="small" />;
  }

  const getRoleBadge = () => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch(role) {
      case "admin":
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}><FaUserShield className="inline mr-1" /> Admin</span>;
      case "tour-guide":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}><FaUserTie className="inline mr-1" /> Tour Guide</span>;
      default:
        return <span className={`${baseClasses} bg-green-100 text-green-800`}><FaUser className="inline mr-1" /> Tourist</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={currentUser?.image || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
            />
            <div className="absolute -bottom-2 right-2">
              {getRoleBadge()}
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {currentUser?.name || "User"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <FaEnvelope className="inline mr-2" />
              {currentUser?.email}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>

              {role === "tourist" && (
                <Link to="/dashboard/join-tour-guide">
                  <button className="flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg transition">
                    Become a Guide <FaArrowRight className="ml-2" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Dashboard */}
      {role === "admin" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <FaUserShield className="mr-2 text-purple-500" />
            Admin Dashboard
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <StatCard 
              icon={<FaMoneyBillWave className="text-blue-500 text-2xl" />}
              title="Total Revenue"
              value={`৳${stats.totalPayment?.toLocaleString() || 0}`}
              trend="up"
              trendValue="12%"
              bgColor="bg-blue-50 dark:bg-blue-900/30"
            />
            
            <StatCard 
              icon={<FaUsers className="text-green-500 text-2xl" />}
              title="Tour Guides"
              value={stats.totalGuides || 0}
              trend="up"
              trendValue="5%"
              bgColor="bg-green-50 dark:bg-green-900/30"
            />
            
            <StatCard 
              icon={<FaBoxOpen className="text-amber-500 text-2xl" />}
              title="Packages"
              value={stats.totalPackages || 0}
              trend="steady"
              bgColor="bg-amber-50 dark:bg-amber-900/30"
            />
            
            <StatCard 
              icon={<FaUser className="text-purple-500 text-2xl" />}
              title="Clients"
              value={stats.totalTourists || 0}
              trend="up"
              trendValue="8%"
              bgColor="bg-purple-50 dark:bg-purple-900/30"
            />
            
            <StatCard 
              icon={<FaBook className="text-pink-500 text-2xl" />}
              title="Stories"
              value={stats.totalStories || 0}
              trend="up"
              trendValue="15%"
              bgColor="bg-pink-50 dark:bg-pink-900/30"
            />
          </div>
        </div>
      )}

      {/* Additional User Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Account Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Member Since" value={new Date(currentUser?.createdAt).toLocaleDateString()} />
          <InfoItem label="Last Login" value={new Date().toLocaleString()} />
          <InfoItem label="Account Status" value="Active" status="active" />
          {role === "tour-guide" && (
            <InfoItem label="Tours Conducted" value="24" />
          )}
        </div>
      </div>

      {/* <EditProfileModal */}
       {/* //  user={currentUser} */}
       {/* //  isOpen={isModalOpen} */}
       {/* //  setIsModalOpen={setIsModalOpen} */}
       {/* //  refetch={refetch} */}
       {/* // />  */}
    </div>
  );
};

export default ManageProfile;
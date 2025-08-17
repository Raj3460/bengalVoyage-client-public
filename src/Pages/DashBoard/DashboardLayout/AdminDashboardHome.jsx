import React from 'react';
import { 
  FaUsers, FaMoneyBillWave, FaCalendarAlt, FaChartLine,
  FaBoxOpen, FaUserShield, FaClipboardList, FaCog,
  FaUserTie, FaBook, FaWallet
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import useAuth from '../../../Hooks/useAuth';
import LoadingSpinner from '../../../Component/Sheard/LoadingSpinner';

const StatCard = ({ title, value, icon, color, isLoading, small = false }) => (
  <div className={`bg-white p-${small ? '4' : '6'} rounded-lg shadow-md flex items-center justify-between ${color}`}>
    <div>
      <p className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'} font-medium`}>{title}</p>
      {isLoading ? (
        <div className={`h-${small ? '6' : '8'} w-${small ? '16' : '20'} bg-gray-200 rounded animate-pulse mt-1`}></div>
      ) : (
        <h3 className={`${small ? 'text-xl' : 'text-2xl'} font-bold mt-1`}>{value}</h3>
      )}
    </div>
    <div className={`text-${small ? '2xl' : '3xl'} p-2 rounded-full bg-opacity-20`}>
      {icon}
    </div>
  </div>
);

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecureApi();

  // Fetch current user data
  const { data: currentUser = {}, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Fetch admin stats
  const { 
    data: adminStats = {}, 
    isLoading: isStatsLoading 
  } = useQuery({
    queryKey: ["adminStats"],
    enabled: currentUser?.role === "admin",
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // Format data for the chart
  const chartData = [
    { name: 'Guides', value: adminStats?.data?.totalGuides || 0 },
    { name: 'Tourists', value: adminStats?.data?.totalTourists || 0 },
    { name: 'Packages', value: adminStats?.data?.totalPackages || 0 },
    { name: 'Stories', value: adminStats?.data?.totalStories || 0 },
  ];

  if (isUserLoading || isStatsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-accent mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Total Guides" 
          value={adminStats?.data?.totalGuides || 0} 
          icon={<FaUserTie className="text-blue-500" />} 
          color="bg-blue-50 text-blue-800"
          isLoading={isStatsLoading}
        />
        <StatCard 
          title="Total Tourists" 
          value={adminStats?.data?.totalTourists || 0} 
          icon={<FaUsers className="text-green-500" />} 
          color="bg-green-50 text-green-800"
          isLoading={isStatsLoading}
        />
        <StatCard 
          title="Total Packages" 
          value={adminStats?.data?.totalPackages || 0} 
          icon={<FaBoxOpen className="text-yellow-500" />} 
          color="bg-yellow-50 text-yellow-800"
          isLoading={isStatsLoading}
        />
        <StatCard 
          title="Total Revenue" 
          value={`৳${(adminStats?.data?.totalPayments || 0).toLocaleString()}`} 
          icon={<FaWallet className="text-purple-500" />} 
          color="bg-purple-50 text-purple-800"
          isLoading={isStatsLoading}
        />
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  name="Count"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Overview</h2>
          <div className="space-y-4">
            <StatCard 
              title="Tour Packages" 
              value={adminStats?.data?.totalPackages || 0} 
              icon={<FaBoxOpen className="text-blue-500" />} 
              color="bg-blue-50 text-blue-800"
              isLoading={isStatsLoading}
              small
            />
            <StatCard 
              title="Travel Stories" 
              value={adminStats?.data?.totalStories || 0} 
              icon={<FaBook className="text-green-500" />} 
              color="bg-green-50 text-green-800"
              isLoading={isStatsLoading}
              small
            />
            <StatCard 
              title="Total Revenue" 
              value={`৳${(adminStats?.data?.totalPayments || 0).toLocaleString()}`} 
              icon={<FaMoneyBillWave className="text-purple-500" />} 
              color="bg-purple-50 text-purple-800"
              isLoading={isStatsLoading}
              small
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
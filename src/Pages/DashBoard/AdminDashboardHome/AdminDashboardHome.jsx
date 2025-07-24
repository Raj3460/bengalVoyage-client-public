import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  FaUsers, FaMapMarkedAlt, FaBookOpen, 
  FaMoneyBillWave, FaUserTie, FaChartLine, 
  FaSuitcase , 


 
} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import StatCard from './StatCard';
import { BsFillBarChartLineFill } from 'react-icons/bs';
// import StatCard from './StatCard';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const AdminDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();
  
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data.data || {};
    },
  });

  const userDistributionData = [
    { name: 'Tourists', value: stats.totalTourists || 0 },
    { name: 'Guides', value: stats.totalGuides || 0 },
    { name: 'Admins', value: 1 }, // Assuming current user is admin
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 3890 },
    { month: 'Jun', revenue: 2390 },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 mr-4">
          <MdAdminPanelSettings className="text-2xl text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard Overview
        </h1>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`৳${(stats.totalPayments || 0).toLocaleString()}`}
          icon={<FaMoneyBillWave />}
          color="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
          delay={0}
        />
        <StatCard
          title="Tour Guides"
          value={(stats.totalGuides || 0).toLocaleString()}
          icon={<FaUserTie />}
          color="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
          delay={0.1}
        />
        <StatCard
          title="Packages"
          value={(stats.totalPackages || 0).toLocaleString()}
          icon={<FaMapMarkedAlt />}
          color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
          delay={0.2}
        />
        <StatCard
          title="Tourists"
          value={(stats.totalTourists || 0).toLocaleString()}
          icon={<FaUsers />}
          color="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
          delay={0.3}
        />
      </div>  */}
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
                    value={`৳${stats?.totalPayments?.toLocaleString() || 0}`}
                    icon={<BsFillBarChartLineFill className="text-blue-500" />}
                    color={{ bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-200" }}
                  />
                  <StatCard
                    title="Tour Guides"
                    value={(stats?.totalGuides || 0).toLocaleString()}
                    icon={<FaUserTie  className="text-green-400"/>}
                    color={{ bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-200" }}
                  />
                  <StatCard
                    title="Packages"
                    value={(stats?.totalPackages || 0).toLocaleString()}
                    icon={<FaMapMarkedAlt />}
                    color={{ bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-200" }}
                  />
                  <StatCard
                    title="Tourists"
                    value={(stats?.totalTourists || 0).toLocaleString()}
                    icon={<FaUsers />}
                    color={{ bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-800 dark:text-purple-200" }}
                  />
                  <StatCard
                    title="Travel Stories"
                    value={(stats?.totalStories || 0).toLocaleString()}
                    icon={<FaBookOpen />}
                    color={{ bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-800 dark:text-pink-200" }}
                  />
                </div>
              </div> 

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* User Distribution Pie Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            User Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Revenue Bar Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Monthly Revenue
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-8"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { id: 1, action: 'New booking received', time: '2 hours ago', icon: <FaSuitcase className="text-blue-500" /> },
            { id: 2, action: 'Tour guide application submitted', time: '5 hours ago', icon: <FaUserTie className="text-green-500" /> },
            { id: 3, action: 'New story published', time: '1 day ago', icon: <FaBookOpen className="text-purple-500" /> },
          ].map((activity) => (
            <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 mr-3">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">{activity.action}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardHome;
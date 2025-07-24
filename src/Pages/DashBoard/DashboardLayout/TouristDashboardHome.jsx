import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, Legend
} from 'recharts';
import {
  FaChartLine, FaUserTie, FaMapMarkedAlt,
  FaUser, FaBookOpen
} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f'];

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className={`p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 ${bgColor} ${textColor}`}>
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl p-2 rounded-full bg-white bg-opacity-30">
        {icon}
      </div>
    </div>
  </div>
);

const TouristDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();

  const { data: stats = {} } = useQuery({
    queryKey: ["touristStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tourist/dashboard-stats");
      return res.data.data || {};
    },
  });

  const pieData = [
    { name: 'Tour Guides', value: stats?.totalGuides || 0 },
    { name: 'Packages', value: stats?.totalPackages || 0 },
    { name: 'Tourists', value: stats?.totalTourists || 0 },
    { name: 'Stories', value: stats?.totalStories || 0 },
  ];

  const chartData = [
    { name: 'Revenue', value: stats?.totalUsers || 0 },
    { name: 'Tourists', value: stats?.totalTourists || 0 },
    { name: 'Packages', value: stats?.totalPackages || 0 },
    { name: 'Stories', value: stats?.totalStories || 0 },
    { name: 'Guides', value: stats?.totalGuides || 0 },
  ];

  return (
    <div className="p-6 space-y-10 text-gray-800 dark:text-white">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50">
          <MdAdminPanelSettings className="text-3xl text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold"> Dashboard Overview</h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        <StatCard
          title="Total Revenue"
          value={`${stats?.totalUsers?.toLocaleString() || 0}`}
          icon={<FaChartLine />}
          bgColor="bg-blue-100"
          textColor="text-blue-900"
        />
        <StatCard
          title="Tour Guides"
          value={(stats?.totalGuides || 0).toLocaleString()}
          icon={<FaUserTie />}
          bgColor="bg-green-100"
          textColor="text-green-900"
        />
        <StatCard
          title="Packages"
          value={(stats?.totalPackages || 0).toLocaleString()}
          icon={<FaMapMarkedAlt />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-900"
        />
        <StatCard
          title="Tourists"
          value={(stats?.totalTourists || 0).toLocaleString()}
          icon={<FaUser />}
          bgColor="bg-purple-100"
          textColor="text-purple-900"
        />
        <StatCard
          title="Travel Stories"
          value={(stats?.totalStories || 0).toLocaleString()}
          icon={<FaBookOpen />}
          bgColor="bg-pink-100"
          textColor="text-pink-900"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">Tour Data Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">Overall Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4 text-center">Engagement Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TouristDashboardHome;

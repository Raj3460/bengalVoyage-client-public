import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FaUsers, FaMapMarkedAlt, FaBookOpen, 
  FaMoneyBillWave, FaUserTie, FaChartLine 
} from 'react-icons/fa';
import { MdAdminPanelSettings, MdPayments } from 'react-icons/md';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import StatCard from '../../Shared/StatCard';
import AdminChart from './AdminChart';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

const AdminDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();
  
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data.data || {};
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-purple-100 mr-4">
          <MdAdminPanelSettings className="text-2xl text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`$${(stats.totalPayments || 0).toLocaleString()}`}
          icon={<MdPayments className="text-blue-500" />}
          trend={stats.revenueTrend}
        />
        <StatCard
          title="Tour Guides"
          value={(stats.totalGuides || 0).toLocaleString()}
          icon={<FaUserTie className="text-green-500" />}
          trend={stats.guidesTrend}
        />
        <StatCard
          title="Packages"
          value={(stats.totalPackages || 0).toLocaleString()}
          icon={<FaMapMarkedAlt className="text-yellow-500" />}
        />
        <StatCard
          title="Tourists"
          value={(stats.totalTourists || 0).toLocaleString()}
          icon={<FaUsers className="text-purple-500" />}
          trend={stats.touristsTrend}
        />
        <StatCard
          title="Stories"
          value={(stats.totalStories || 0).toLocaleString()}
          icon={<FaBookOpen className="text-pink-500" />}
        />
        <StatCard
          title="Bookings"
          value={(stats.totalBookings || 0).toLocaleString()}
          icon={<BsFillBarChartLineFill className="text-indigo-500" />}
          trend={stats.bookingsTrend}
        />
      </div>

      {/* Charts and Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <AdminChart 
            revenueData={stats.monthlyRevenue} 
            userData={stats.userGrowth} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <RecentActivity activities={stats.recentActivities} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Users</span>
              <span className="font-medium">{stats.activeUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Applications</span>
              <span className="font-medium">{stats.pendingApplications || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">System Health</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
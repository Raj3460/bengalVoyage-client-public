import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaBookOpen, FaBell } from 'react-icons/fa';
import { Link } from 'react-router';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import StatCard from '../../Shared/StatCard';

const GuideDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();
  
  const { data: stats = {} } = useQuery({
    queryKey: ["guideStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guide/dashboard-stats");
      return res.data.data || {};
    },
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {stats.user?.name || 'Guide'}!</h1>
        <p className="text-gray-600 mt-2">
          {stats.newAssignments > 0 
            ? `You have ${stats.newAssignments} new tour assignments!`
            : 'Ready for your next tour?'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Assigned Tours"
          value={stats.totalAssignedTours || 0}
          icon={<FaCalendarAlt className="text-blue-500" />}
          subtitle={`${stats.pendingTours || 0} pending`}
        />
        <StatCard
          title="My Stories"
          value={stats.totalStories || 0}
          icon={<FaBookOpen className="text-purple-500" />}
          subtitle="Share your expertise"
        />
        <StatCard
          title="Rating"
          value={stats.averageRating ? `${stats.averageRating}/5` : 'N/A'}
          icon={<FaBell className="text-yellow-500" />}
          subtitle={`${stats.totalReviews || 0} reviews`}
        />
      </div>

      {/* Notifications */}
      {stats.newAssignments > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <FaBell className="text-yellow-500 mr-2" />
            <h3 className="font-medium text-yellow-800">New Tour Assignments</h3>
          </div>
          <p className="mt-2 text-gray-700">
            You have {stats.newAssignments} new tour requests waiting for your response.
          </p>
          <Link 
            to="/guide/assignments" 
            className="mt-3 inline-block text-yellow-700 hover:underline"
          >
            View Assignments →
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          to="/guide/assignments" 
          className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:bg-gray-50 transition"
        >
          <div>
            <h3 className="font-medium">Manage Tours</h3>
            <p className="text-sm text-gray-500">View and respond to assignments</p>
          </div>
          <FaCalendarAlt className="text-blue-500 text-xl" />
        </Link>
        <Link 
          to="/add-story" 
          className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:bg-gray-50 transition"
        >
          <div>
            <h3 className="font-medium">Add Story</h3>
            <p className="text-sm text-gray-500">Share your travel insights</p>
          </div>
          <FaBookOpen className="text-purple-500 text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default GuideDashboardHome;
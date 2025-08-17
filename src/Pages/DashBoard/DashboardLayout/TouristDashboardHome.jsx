import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar
} from 'recharts';
import {
  FaChartLine, FaUserTie, FaMapMarkedAlt,
  FaUser, FaBookOpen, FaHotel, FaMoneyBillWave,
  FaCalendarAlt, FaStar, FaSearch, FaTimes, FaInfoCircle
} from 'react-icons/fa';
import { MdAdminPanelSettings, MdPayment, MdHelp } from 'react-icons/md';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#ff8042'];

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className={`p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${bgColor} ${textColor}`}>
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

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-primary">Booking Details</h3>
          <button 
            onClick={onClose}
            className="text-secondary hover:text-accent transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-lg">
              <FaInfoCircle className="text-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-primary">{booking.packageName}</h4>
              <p className="text-secondary">Booking ID: {booking._id}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-secondary" />
              <div>
                <p className="text-sm text-secondary">Tourist</p>
                <p className="font-medium text-primary">{booking.touristName}</p>
                <p className="text-xs text-secondary">{booking.touristEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-secondary" />
              <div>
                <p className="text-sm text-secondary">Tour Date</p>
                <p className="font-medium text-primary">
                  {new Date(booking.tourDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-secondary" />
              <div>
                <p className="text-sm text-secondary">Booking Date</p>
                <p className="font-medium text-primary">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-secondary" />
              <div>
                <p className="text-sm text-secondary">Price</p>
                <p className="font-medium text-primary">৳{booking.price}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 rounded-lg border">
            <div>
              <p className="text-sm text-secondary">Booking Status</p>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                booking.status === 'confirmed' ? 'bg-success/10 text-success' :
                booking.status === 'pending' ? 'bg-warning/10 text-warning' :
                'bg-error/10 text-error'
              }`}>
                {booking.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-secondary">Payment Status</p>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                booking.payment_status === 'paid' ? 'bg-success/10 text-success' :
                'bg-error/10 text-error'
              }`}>
                {booking.payment_status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-base-300 rounded-lg hover:bg-base-200 transition"
          >
            Close
          </button>
          {booking.payment_status === 'unpaid' && (
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-focus transition">
              Make Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TouristDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch current user data
  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Fetch bookings data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, [pagination.current]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/bookings/user?email=${user.email}`,
        {
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
          },
        }
      );
      setBookings(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.pagination.total,
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard stats
  const { data: stats = {} } = useQuery({
    queryKey: ["touristStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tourist/dashboard-stats");
      return res.data.data || {};
    },
  });

  // Chart data
  const pieData = [
    { name: 'Tour Guides', value: stats?.totalGuides || 0 },
    { name: 'Packages', value: stats?.totalPackages || 0 },
    { name: 'Tourists', value: stats?.totalTourists || 0 },
    { name: 'Stories', value: stats?.totalStories || 0 },
  ];

  const trendData = [
    { name: 'Jan', users: 4000, bookings: 2400 },
    { name: 'Feb', users: 3000, bookings: 1398 },
    { name: 'Mar', users: 2000, bookings: 9800 },
    { name: 'Apr', users: 2780, bookings: 3908 },
    { name: 'May', users: 1890, bookings: 4800 },
    { name: 'Jun', users: 2390, bookings: 3800 },
  ];

  return (
    <div className="p-6 space-y-8 bg-base-100 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <MdAdminPanelSettings className="text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome back, {currentUser?.name || 'Traveler'}!
            </h1>
            <p className="text-secondary">
              Here's what's happening with your travel plans
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <FaSearch className="absolute left-3 top-3 text-secondary" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <StatCard
          title="My Bookings"
          value={bookings.length}
          icon={<FaCalendarAlt />}
          bgColor="bg-blue-100"
          textColor="text-blue-900"
        />
        <StatCard
          title="Total Spent"
          value={`৳${bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)}`}
          icon={<FaMoneyBillWave />}
          bgColor="bg-green-100"
          textColor="text-green-900"
        />
        <StatCard
          title="Tour Guides"
          value={(stats?.totalGuides || 0).toLocaleString()}
          icon={<FaUserTie />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-900"
        />
        <StatCard
          title="Packages"
          value={(stats?.totalPackages || 0).toLocaleString()}
          icon={<FaMapMarkedAlt />}
          bgColor="bg-purple-100"
          textColor="text-purple-900"
        />
        <StatCard
          title="Wishlist"
          value="3"
          icon={<FaStar />}
          bgColor="bg-pink-100"
          textColor="text-pink-900"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid  gap-8">
        {/* Left Column */}
        <div className=" space-y-8">
          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Recent Bookings</h2>
              <Link to="/dashboard/my_bookings">
                <button className="text-sm text-accent cursor-pointer hover:text-accent-focus font-medium">
                  View All
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-base-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase">Tour</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-accent">
                        {booking?.packageName || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-secondary">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' ? 'bg-success/10 text-success' :
                          booking.status === 'pending' ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-secondary">
                        ৳{booking.price || '0'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-secondary">
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="text-accent hover:text-accent-focus cursor-pointer font-medium"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-center text-primary">Tour Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-center text-primary">Booking Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
                  <Bar dataKey="users" fill="#82ca9d" name="Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
       

      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      )}
    </div>
  );
};

export default TouristDashboardHome;
import React, { useState } from 'react';
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaChartLine,
  FaBoxOpen,
  FaUserShield,
  FaClipboardList,
  FaCog,
  FaUserTie,
  FaBook,
  FaWallet,
  FaComments,
  FaEnvelope,
  FaBell,
  FaSearch,
  FaPlus,
  FaSignOutAlt,
  FaHome,
  FaChartBar,
  FaShoppingBag,
  FaFileAlt,
  FaEllipsisH
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import useAuth from '../../../Hooks/useAuth';
import LoadingSpinner from '../../../Component/Sheard/LoadingSpinner';

const StatCard = ({ title, value, icon, color, isLoading }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md flex items-center justify-between ${color}`}>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      {isLoading ? (
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2"></div>
      ) : (
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      )}
    </div>
    <div className="text-3xl p-3 rounded-full bg-opacity-20">
      {icon}
    </div>
  </div>
);

const ChatMessage = ({ message, isCurrentUser }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
    <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
      <p>{message.text}</p>
      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', timestamp: new Date(), isAdmin: true },
    { id: 2, text: 'I need help with the new dashboard', timestamp: new Date(), isAdmin: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          timestamp: new Date(),
          isAdmin: false,
        },
      ]);
      setNewMessage('');
      
      // Simulate admin reply after 1 second
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'Thanks for your message. We will get back to you soon!',
            timestamp: new Date(),
            isAdmin: true,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 bg-white shadow-lg rounded-t-lg transition-all duration-300 ${isOpen ? 'h-96' : 'h-0'} overflow-hidden`}>
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <h3 className="font-semibold">Support Chat</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          &times;
        </button>
      </div>
      <div className="p-3 h-64 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isCurrentUser={!message.isAdmin} 
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const AdminDashboardHome = () => {
  const { user, logout } = useAuth();
  const axiosSecure = UseAxiosSecureApi();
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  const quickLinks = [
    { title: 'Dashboard', icon: <FaHome />, link: '/admin/dashboard', color: 'bg-blue-100 text-blue-600' },
    { title: 'Users', icon: <FaUsers />, link: '/admin/users', color: 'bg-green-100 text-green-600' },
    { title: 'Packages', icon: <FaShoppingBag />, link: '/admin/packages', color: 'bg-purple-100 text-purple-600' },
    { title: 'Bookings', icon: <FaCalendarAlt />, link: '/admin/bookings', color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Stories', icon: <FaFileAlt />, link: '/admin/stories', color: 'bg-red-100 text-red-600' },
    { title: 'Reports', icon: <FaChartBar />, link: '/admin/reports', color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Payments', icon: <FaMoneyBillWave />, link: '/admin/payments', color: 'bg-pink-100 text-pink-600' },
    { title: 'Settings', icon: <FaCog />, link: '/admin/settings', color: 'bg-gray-100 text-gray-600' },
  ];

  if (isUserLoading || isStatsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="p-4 md:p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaBell className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaEnvelope className="text-gray-600" />
          </button>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <FaComments className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button 
            onClick={logout}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
      
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8" 
                  name="Count"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className={`p-4 rounded-lg flex flex-col items-center transition-all hover:shadow-md ${link.color} hover:scale-[1.02]`}
              >
                <div className="text-2xl mb-2">{link.icon}</div>
                <span className="font-medium text-sm text-center">{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaUserTie className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New guide registration</p>
                <p className="text-sm text-gray-500">Guide #{item} has registered on the platform</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisH />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FaComments className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default AdminDashboardHome;
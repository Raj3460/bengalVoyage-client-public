import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaChartLine, FaUserTie, FaMapMarkedAlt, FaMoneyBillWave,
  FaCalendarAlt, FaSpinner, FaCheck, FaTimes, FaInfoCircle, FaStar
} from 'react-icons/fa';
import { MdAdminPanelSettings, MdPayment, MdHelp, MdTour } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { toast } from 'react-toastify';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import useAuth from '../../../Hooks/useAuth';

// Inline TourStatusBadge component
const TourStatusBadge = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    'in-review': 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// Inline ConfirmationModal component
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  confirmText, 
  confirmColor = 'bg-red-600 hover:bg-red-700',
  isLoading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-lg transition ${confirmColor} ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? <FaSpinner className="animate-spin inline mr-2" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline EmptyState component
const EmptyState = ({ title, description, icon, action }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-12 w-12 text-gray-400 mb-4">
        {icon || <FaInfoCircle className="text-4xl" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor, textColor, isLoading }) => (
  <div className={`p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${bgColor} ${textColor}`}>
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        {isLoading ? (
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </div>
      <div className="text-3xl p-2 rounded-full bg-white bg-opacity-30">
        {icon}
      </div>
    </div>
  </div>
);

const GuideDashboardHome = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  // Fetch current guide data
  const { data: currentUser = {}, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentGuide", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // // Fetch assigned tours
  // const { 
  //   data: tours = [], 
  //   isLoading: isLoadingTours, 
  //   isError: isToursError,
  //   refetch: refetchTours
  // } = useQuery({
  //   queryKey: ['assignedTours'],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/assigned-tours');
  //     return res.data || [];
  //   }
  // });

  // Fetch dashboard stats
  const { 
    data: stats = {}, 
    isLoading: isLoadingStats 
  } = useQuery({
    queryKey: ["guideStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guide/stats");
      return res.data || {};
    },
  });

  // Accept tour mutation
  const { mutate: acceptTour, isPending: isAccepting } = useMutation({
    mutationFn: async (tourId) => {
      const res = await axiosSecure.patch(`/assigned-tours/${tourId}/accept`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
      queryClient.invalidateQueries(['guideStats']);
      toast.success('Tour accepted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to accept tour');
    }
  });

  // Reject tour mutation
  const { mutate: rejectTour, isPending: isRejecting } = useMutation({
    mutationFn: async (tourId) => {
      const res = await axiosSecure.patch(`/assigned-tours/${tourId}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
      queryClient.invalidateQueries(['guideStats']);
      toast.success('Tour rejected successfully');
      setShowRejectModal(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject tour');
    }
  });

  const handleRejectClick = (tourId) => {
    setSelectedTourId(tourId);
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    if (selectedTourId) {
      rejectTour(selectedTourId);
    }
  };

  // if (isLoadingUser || isLoadingTours || isLoadingStats) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <FaSpinner className="animate-spin text-4xl text-primary" />
  //     </div>
  //   );
  // }

  // if (isToursError) {
  //   return (
  //     <EmptyState 
  //       title="Error loading tours"
  //       description="Failed to fetch your assigned tours. Please try again."
  //       action={
  //         <button 
  //           onClick={() => refetchTours()}
  //           className="btn btn-primary"
  //         >
  //           Retry
  //         </button>
  //       }
  //     />
  //   );
  // }

  return (
    <div className="p-4 md:p-6 space-y-8 bg-base-100 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <MdTour className="text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome, {currentUser?.name || 'Tour Guide'}!
            </h1>
            <p className="text-secondary">
              Here's what's happening with your tours today
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-medium text-yellow-800">
              {stats?.averageRating?.toFixed(1) || '4.8'} ({stats?.totalReviews || '24'})
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Assigned Tours"
          value={stats?.assignedTours || 0}
          icon={<FaCalendarAlt />}
          bgColor="bg-blue-50"
          textColor="text-blue-800"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Completed Tours"
          value={stats?.completedTours || 0}
          icon={<FaCheck />}
          bgColor="bg-green-50"
          textColor="text-green-800"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Total Earnings"
          value={`$${(stats?.totalEarnings || 0).toLocaleString()}`}
          icon={<GiMoneyStack />}
          bgColor="bg-yellow-50"
          textColor="text-yellow-800"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Upcoming Tours"
          value={stats?.upcomingTours || 0}
          icon={<FaMapMarkedAlt />}
          bgColor="bg-purple-50"
          textColor="text-purple-800"
          isLoading={isLoadingStats}
        />
      </div>

      {/* Assigned Tours Section */}
      {/* <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-primary">Your Assigned Tours</h2>
          <div className="text-sm text-secondary">
            Showing {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
          </div>
        </div>
        
        {tours.length === 0 ? (
          <EmptyState 
            title="No tours assigned yet"
            description="You don't have any tours assigned to you at the moment."
            icon={<MdTour className="text-4xl text-gray-400" />}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tourists</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tours.map((tour) => (
                  <tr key={tour._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={tour.packageImage || '/default-tour.jpg'} 
                            alt={tour.packageName} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tour.packageName}</div>
                          <div className="text-sm text-gray-500">{tour.duration} days</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(tour.tourDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {tour.tourTime || '10:00 AM'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2 overflow-hidden">
                        {tour.tourists?.slice(0, 3).map((tourist, idx) => (
                          <img 
                            key={idx}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                            src={tourist.image || '/default-user.jpg'}
                            alt={tourist.name}
                          />
                        ))}
                        {tour.tourists?.length > 3 && (
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">
                            +{tour.tourists.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TourStatusBadge status={tour.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      {tour.status === 'pending' && (
                        <>
                          <button
                            onClick={() => acceptTour(tour._id)}
                            disabled={isAccepting}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            {isAccepting ? 'Accepting...' : 'Accept'}
                          </button>
                          <button
                            onClick={() => handleRejectClick(tour._id)}
                            disabled={isRejecting}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="text-primary hover:text-primary-dark font-medium">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-primary/5 hover:border-primary transition flex flex-col items-center">
            <MdPayment className="text-2xl text-primary mb-2" />
            <span className="text-sm font-medium">View Earnings</span>
            <span className="text-xs text-gray-500 mt-1">Payment history</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-primary/5 hover:border-primary transition flex flex-col items-center">
            <FaCalendarAlt className="text-2xl text-primary mb-2" />
            <span className="text-sm font-medium">My Schedule</span>
            <span className="text-xs text-gray-500 mt-1">View calendar</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-primary/5 hover:border-primary transition flex flex-col items-center">
            <FaUserTie className="text-2xl text-primary mb-2" />
            <span className="text-sm font-medium">Profile</span>
            <span className="text-xs text-gray-500 mt-1">Edit profile</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-primary/5 hover:border-primary transition flex flex-col items-center">
            <MdHelp className="text-2xl text-primary mb-2" />
            <span className="text-sm font-medium">Help Center</span>
            <span className="text-xs text-gray-500 mt-1">Get support</span>
          </button>
        </div>
      </div>

      {/* Reject Tour Modal */}
      <ConfirmationModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
        title="Confirm Tour Rejection"
        confirmText={isRejecting ? 'Rejecting...' : 'Confirm Reject'}
        confirmColor="bg-red-600 hover:bg-red-700"
        isLoading={isRejecting}
      >
        <div className="text-center">
          <FaInfoCircle className="mx-auto text-4xl text-yellow-500 mb-4" />
          <p className="text-gray-700 mb-2">
            Are you sure you want to reject this tour assignment?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone. The tourist will be notified of your rejection.
          </p>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default GuideDashboardHome;
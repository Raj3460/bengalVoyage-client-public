import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import { useState } from 'react';
import { FaSpinner, FaInfoCircle } from 'react-icons/fa';

const AssignedTours = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  // Fetch assigned tours
  const { 
    data: tours = [], 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ['assignedTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/assigned-tours');
      return res.data.data || [];
    }
  });

  // Accept tour mutation
  const { mutate: acceptTour, isPending: isAccepting } = useMutation({
    mutationFn: async (tourId) => {
      const res = await axiosSecure.patch(`/assigned-tours/${tourId}/accept`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
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
    rejectTour(selectedTourId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-3xl text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-error mb-4">Error loading tours</p>
        <button 
          onClick={() => refetch()}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold dark:text-white">My Assigned Tours</h2>
    <button 

      className="btn btn-circle btn-sm"
    >
   
    </button>
  </div>
  
  {tours.length === 0 ? (
    <div className="alert alert-info dark:bg-gray-700 dark:text-white">
      <FaInfoCircle className="text-xl" />
      <span>No tours assigned to you yet.</span>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]"> {/* Minimum width to prevent line breaks */}
        <table className="table w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="whitespace-nowrap dark:text-gray-700">Package</th>
              <th className="whitespace-nowrap dark:text-gray-700">Tourist</th>
              <th className="whitespace-nowrap dark:text-gray-700">Date</th>
              <th className="whitespace-nowrap dark:text-gray-700">Price</th>
              <th className="whitespace-nowrap dark:text-gray-700">Status</th>
              <th className="whitespace-nowrap dark:text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="whitespace-nowrap dark:text-white">{tour.packageName}</td>
                <td className="whitespace-nowrap">
                  <div className="dark:text-white">{tour.touristName}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{tour.touristEmail}</div>
                </td>
                <td className="whitespace-nowrap dark:text-white text-xs">
                  {new Date(tour.tourDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="whitespace-nowrap dark:text-white">Tk: {tour.price.toFixed(2)}</td>
                <td className="whitespace-nowrap">
                  <span className={`badge ${
                    tour.status === 'pending' ? 'badge-warning' :
                    tour.status === 'in-review' ? 'badge-info' :
                    tour.status === 'accepted' ? 'badge-success' : 'badge-error'
                  }`}>
                    {tour.status}
                  </span>
                </td>
                <td className="whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptTour(tour._id)}
                      disabled={tour.status !== 'in-review' || isAccepting}
                      className={`btn btn-xs ${
                        tour.status === 'in-review' ? 'btn-success' : 'btn-disabled'
                      }`}
                    >
                      {isAccepting ? <FaSpinner className="animate-spin" /> : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleRejectClick(tour._id)}
                      disabled={tour.status !== 'in-review' || isRejecting}
                      className={`btn btn-xs ${
                        tour.status === 'in-review' ? 'btn-error' : 'btn-disabled'
                      }`}
                    >
                      {isRejecting ? <FaSpinner className="animate-spin" /> : 'Reject'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}

  {/* Reject Confirmation Modal */}
  {showRejectModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Confirm Rejection</h3>
        <p className="mb-6 dark:text-gray-300">Are you sure you want to reject this tour?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowRejectModal(false)}
            className="btn btn-outline dark:text-white btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmReject}
            className="btn btn-error btn-sm"
            disabled={isRejecting}
          >
            {isRejecting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Rejecting...
              </>
            ) : (
              'Confirm Reject'
            )}
          </button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default AssignedTours;
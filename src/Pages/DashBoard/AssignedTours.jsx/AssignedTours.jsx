import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';

const AssignedTours = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();

  // 1. First fix - Ensure we always get an array
  const { 
    data: response = {}, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['assignedTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/assigned-tours');
return res.data;
    }
  });

  // 2. Second fix - Properly extract tours array with fallback
  const tours = Array.isArray(response?.data) ? response.data : [];
  console.log(tours);

  // Accept tour mutation
  const { mutate: acceptTour } = useMutation({
    mutationFn: async (tourId) => {
      const res = await axiosSecure.patch(`/assigned-tours/${tourId}/accept`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
      toast.success('Tour accepted successfully');
    }
  });

  // Reject tour mutation
  const { mutate: rejectTour } = useMutation({
    mutationFn: async (tourId) => {
      const res = await axiosSecure.patch(`/assigned-tours/${tourId}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedTours']);
      toast.success('Tour rejected successfully');
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading tours...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error loading tours</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Assigned Tours</h2>
      
      {/* 3. Third fix - Safely render tours */}
      {tours.length === 0 ? (
        <div className="alert alert-info">
          No tours assigned to you yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Package</th>
                <th>Tourist</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => (
                <tr key={tour._id}>
                  <td>{tour.packageName}</td>
                  <td>{tour.touristName}</td>
                  <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                  <td>{tour.price} BDT</td>
                  <td>
                    <span className={`badge ${
                      tour.status === 'pending' ? 'badge-warning' :
                      tour.status === 'in-review' ? 'badge-info' :
                      tour.status === 'accepted' ? 'badge-success' : 'badge-error'
                    }`}>
                      {tour.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptTour(tour._id)}
                        disabled={tour.status !== 'in-review'}
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reject this tour?')) {
                            rejectTour(tour._id);
                          }
                        }}
                        disabled={tour.status !== 'in-review'}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedTours;
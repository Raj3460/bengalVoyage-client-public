import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import LoadingSpinner from '../../../Component/Sheard/LoadingSpinner';
import ErrorMessage from '../../../Component/Sheard/ErrorMessage';
import { FaUser, FaUserTie, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const ManageCandidates = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();

  // Fetch all applications
  const { data: applications, isLoading, isError, error } = useQuery({
    queryKey: ['allApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tour-guides-applications');
      return res.data;
    }
  });

  // Mutation for updating user role
  const { mutate: updateRole } = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/users/${email}`, { role: 'tour-guide' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['allApplications']);
    }
  });

  // Mutation for deleting application
  const { mutate: deleteApplication } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/tour-guides-applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['allApplications']);
    }
  });

  const handleAccept = async (application) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Approval',
        text: `Approve ${application.applicantName} as a tour guide?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        // Update user role first
        await updateRole(application.applicantEmail);
        
        // Then delete the application
        await deleteApplication(application._id);
        
        Swal.fire(
          'Approved!',
          `${application.applicantName} is now a tour guide.`,
          'success'
        );
      }
    } catch (err) {
      Swal.fire(
        'Error',
        'Failed to approve application',
        'error'
      );
    }
  };

  const handleReject = async (application) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Rejection',
        text: `Reject ${application.applicantName}'s application?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await deleteApplication(application._id);
        
        Swal.fire(
          'Rejected!',
          'The application has been rejected.',
          'success'
        );
      }
    } catch (err) {
      Swal.fire(
        'Error',
        'Failed to reject application',
        'error'
      );
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={true} />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <FaUserTie className="mr-2" />
              Manage Tour Guide Applications
            </h2>
            <p className="opacity-90 mt-1">Review and approve/reject applications</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {applications?.data?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.data.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={app.applicantImage} 
                                alt={app.applicantName} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{app.applicantName}</div>
                              <div className="text-sm text-gray-500">{app.applicantEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {app.currentRole || 'Tourist'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{app.applicationTitle}</div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">{app.motivation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{format(new Date(app.appliedAt), 'PP')}</div>
                          <div className="text-xs text-gray-500">{format(new Date(app.appliedAt), 'p')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAccept(app)}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <FaCheck className="mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(app)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <FaTimes className="mr-1" /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                  <FaUser className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No pending applications</h3>
                <p className="mt-2 text-gray-500">
                  There are currently no tour guide applications to review.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates;
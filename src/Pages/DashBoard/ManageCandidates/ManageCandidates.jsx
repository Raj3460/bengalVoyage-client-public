import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';
import { FaUserTie, FaCheckCircle, FaTimesCircle, FaEye, FaClock, FaFilePdf } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingSpinner from '../../../Component/Sheard/LoadingSpinner';

const MySwal = withReactContent(Swal);

const ApplicationModal = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          {/* Close Button - Top Right */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{application.applicationTitle}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Applicant Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Applicant Details</h4>
              <div className="flex items-center space-x-4">
                <img
                  src={application.applicantImage || 'https://ui-avatars.com/api/?name='+application.applicantName}
                  alt={application.applicantName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{application.applicantName}</p>
                  <p className="text-sm text-gray-500">{application.applicantEmail}</p>
                  <p className="text-sm text-blue-600 mt-1">{application.role || 'Tourist'}</p>
                </div>
              </div>

              {/* CV Link Section */}
              {application.cvLink && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Curriculum Vitae</h4>
                  <a 
                    href={application.cvLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FaFilePdf className="mr-2" />
                    View/Download CV
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    File type: {application.cvLink.split('.').pop().toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* Application Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Application Info</h4>
              <div>
                <p className="text-sm font-medium text-gray-500">Applied On</p>
                <p className="text-gray-900">
                  {format(parseISO(application.appliedAt), 'PPpp')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-full ${
                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status}
                </span>
              </div>
            </div>

            {/* Motivation */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Motivation</h4>
              <p className="text-gray-700 whitespace-pre-line">{application.motivation}</p>
            </div>

            {/* Availability */}
            {application.availability && (
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Availability</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(application.availability).map(([day, times]) => (
                    <div key={day} className="bg-gray-50 p-3 rounded-lg flex-1 min-w-[120px]">
                      <p className="font-medium text-gray-800 capitalize">{day}</p>
                      {times.map((time, i) => (
                        <p key={i} className="text-sm text-gray-600 flex items-center">
                          <FaClock className="mr-1 text-gray-400" /> {time}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageCandidates = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['adminTourGuideApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tour-guides-applications');
      return res.data.data;
    }
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/admin/tour-guides-applications/accept/${id}`);
    },
    onSuccess: () => {
      MySwal.fire('Accepted', 'User promoted to Tour Guide!', 'success');
      queryClient.invalidateQueries(['adminTourGuideApplications']);
    },
    onError: () => {
      MySwal.fire('Error', 'Something went wrong while accepting.', 'error');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/admin/tour-guides-applications/reject/${id}`);
    },
    onSuccess: () => {
      MySwal.fire('Rejected', 'Application has been rejected.', 'info');
      queryClient.invalidateQueries(['adminTourGuideApplications']);
    },
    onError: () => {
      MySwal.fire('Error', 'Something went wrong while rejecting.', 'error');
    }
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="p-8 bg-base-300 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold ">Tour Guide Applications</h2>
        <span className="badge text-black font-bold badge-lg badge-primary">
          {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-primary to-primary ">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {applications.map(app => (
              <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                {/* Application Title */}
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{app.applicationTitle}</div>
                </td>

                {/* Applicant Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={app.applicantImage || 'https://ui-avatars.com/api/?name='+app.applicantName}
                        alt={app.applicantName}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{app.applicantName}</div>
                      <div className="text-xs text-gray-500">{app.applicantEmail}</div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(parseISO(app.appliedAt), 'PP')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(parseISO(app.appliedAt), 'p')}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                      <FaEye className="mr-1.5" /> View
                    </button>
                    <button
                      onClick={() => acceptMutation.mutate(app._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                    >
                      <FaCheckCircle className="mr-1.5" /> Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(app._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                    >
                      <FaTimesCircle className="mr-1.5" /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <FaUserTie className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">There are currently no tour guide applications to review.</p>
        </div>
      )}

      {selectedApp && (
        <ApplicationModal 
          application={selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
    </div>
  );
};

export default ManageCandidates;
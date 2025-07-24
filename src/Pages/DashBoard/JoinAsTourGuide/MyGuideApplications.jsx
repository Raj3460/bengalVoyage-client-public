import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import ErrorMessage from "../../../Component/Sheard/ErrorMessage";
import {
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyGuideApplications = () => {
  const axiosSecure = UseAxiosSecureApi();
  const { user } = useAuth();

  const {
    data: applications,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myGuideApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tour-guides-applications?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `/tour-guides-applications/${id}?email=${user.email}`
        );
        if (res.data?.success) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your application has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          refetch(); // Refresh the list
        } else {
          Swal.fire("Error", "Failed to delete the application", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen={true} />;
  if (isError) return <ErrorMessage message={error.message} />;

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="badge badge-success gap-2 whitespace-nowrap">
            <FaCheckCircle /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="badge badge-error gap-2 whitespace-nowrap">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className="badge badge-warning gap-2 whitespace-nowrap">
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-primary to-secondary text-primary-content">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-secondary bg-opacity-20 mr-4">
                    <FaUserTie className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      My Tour Guide Applications
                    </h2>
                    <p className="opacity-90">
                      Track and manage your submitted applications
                    </p>
                  </div>
                </div>
                <div className="badge badge-lg badge-accent">
                  {applications?.data?.length || 0}{" "}
                  {applications?.data?.length === 1
                    ? "Application"
                    : "Applications"}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-6">
              {applications?.data?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra ">
                    {/* Table Head */}
                    <thead>
                      <tr>
                        <th className="w-14">Image</th>
                        <th className="min-w-[200px]">Title</th>
                        <th className="min-w-[250px]">Description</th>
                        <th>Status</th>
                        <th className="whitespace-nowrap">Applied Date</th>
                        <th>Feedback</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.data.map((app) => (
                        <tr key={app._id} className="hover">
                          {/* Avatar */}
                          <td>
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={app.applicantImage}
                                  alt="Applicant Avatar"
                                />
                              </div>
                            </div>
                          </td>

                          {/* Title */}
                          <td>
                            <div className="font-bold line-clamp-2 hover:line-clamp-none transition-all">
                              {app.applicationTitle}
                            </div>
                          </td>

                          {/* Description */}
                          <td>
                            <div className="text-sm opacity-80 line-clamp-2  transition-all">
                              {app.motivation}
                            </div>
                            {app.cvLink && (
                              <a
                                href={app.cvLink}
                                target="_blank"
                                rel="noreferrer"
                                className="link link-accent text-sm flex items-center mt-1"
                              >
                                <FaFileAlt className="mr-1" /> View CV
                              </a>
                            )}
                          </td>

                          {/* Status */}
                          <td>{getStatusBadge(app.status)}</td>

                          {/* Date */}
                          <td>
                            <div className="text-sm whitespace-nowrap">
                              {format(new Date(app.appliedAt), "PP")}
                            </div>
                            <div className="text-xs opacity-50 whitespace-nowrap">
                              {format(new Date(app.appliedAt), "p")}
                            </div>
                          </td>

                          {/* Feedback */}
                          <td>
                            {app.feedback ? (
                              <div className="tooltip" data-tip={app.feedback}>
                                <div className="flex items-center max-w-[200px]">
                                  <FaInfoCircle className="text-info mr-2 flex-shrink-0" />
                                  <span className="text-sm line-clamp-1">
                                    {app.feedback}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm opacity-50">
                                No feedback
                              </span>
                            )}
                          </td>

                          {/* Action */}
                          <td>
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="btn btn-ghost btn-xs text-error tooltip"
                              data-tip="Delete application"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-base-200 mb-4">
                    <FaUserTie className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    No applications submitted
                  </h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    You haven't applied to become a tour guide yet. Start your
                    journey by submitting an application.
                  </p>
                <Link to='/dashboard/join_as_tour_guide'>  <button className="btn btn-primary mt-6">Apply Now</button></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGuideApplications;

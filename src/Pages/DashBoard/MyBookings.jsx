import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import UseAxiosSecureApi from "../../Hooks/Api/UseAxiosSecureApi";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const axiosSecure = UseAxiosSecureApi();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  const handleCancel = async (bookingId) => {
    console.log(bookingId);
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      const apiResult = await axiosSecure.delete(`/bookings/${bookingId}`);

      if (apiResult.data.success) {
        // Show success message
        await Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchBookings();
      } else {
        Swal.fire({
          title: "Error!",
          text: apiResult.data.message || "Failed to cancel booking",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to cancel booking",
        icon: "error",
      });
    }
  };

  const statusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      "in review": "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    const statusText = {
      pending: "Pending",
      "in review": "In Review",
      accepted: "Accepted",
      rejected: "Rejected",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {statusText[status] || status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">

      <h1 className="text-3xl font-bold text-primary mb-8">My Bookings</h1>
      {/* <h1 onClick={()=> navigate(-1 === "")} className="btn bg-primary text-black">Back to all trips</h1> */}
      </div>

      <div className="bg-base-300 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary text-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Tourist
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Tour Guide
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Tour Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6  whitespace-nowrap">
                      <img
                        src={booking.touristImage}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-4xl p-1 hover:{``}"
                        alt={booking.touristName}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium ">
                        {booking.packageName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">{booking.tourGuide.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">
                        {new Date(booking.tourDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">Tk {booking.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.payment_status === "unpaid" && (
                        <div className="px-2 py-1 rounded-full text-xs bg-red-200 text-red-800 font-medium">
                          {booking.payment_status}
                        </div>
                      )}
                      {booking.payment_status === "paid" && (
                        <div className="px-2 py-1 rounded-full text-xs  bg-green-200 text-green-800 font-medium">
                          {booking.payment_status}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {statusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handlePayment(booking._id)}
                            className="btn btn-xs bg-green-500"
                          >
                            Pay
                          </button>
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="btn btn-xs btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === "" && (
                        <button
                          onClick={() =>
                            navigate(`/tour-details/${booking.packageId}`)
                          }
                          className="btn btn-xs btn-info"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total > pagination.pageSize && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() =>
                  setPagination({
                    ...pagination,
                    current: pagination.current - 1,
                  })
                }
                disabled={pagination.current === 1}
                className="btn btn-sm"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPagination({
                    ...pagination,
                    current: pagination.current + 1,
                  })
                }
                disabled={
                  pagination.current * pagination.pageSize >= pagination.total
                }
                className="btn btn-sm ml-3"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.current - 1) * pagination.pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.current * pagination.pageSize,
                      pagination.total
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  results
                </p>
              </div>
              <div className="join">
                <button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      current: pagination.current - 1,
                    })
                  }
                  disabled={pagination.current === 1}
                  className="join-item btn btn-sm"
                >
                  «
                </button>
                <button className="join-item btn btn-sm">
                  Page {pagination.current}
                </button>
                <button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      current: pagination.current + 1,
                    })
                  }
                  disabled={
                    pagination.current * pagination.pageSize >= pagination.total
                  }
                  className="join-item btn btn-sm"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

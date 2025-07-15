import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import ErrorMessage from "../../../Component/Sheard/ErrorMessage";

const MyGuideApplications = () => {
  const axiosSecure = UseAxiosSecureApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myGuideApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guides-applications/my-applications");
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-primary mb-6">My Tour Guide Applications</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">You haven’t applied as a tour guide yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">CV</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((app, index) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{app.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{app.reason}</td>
                  <td className="px-4 py-3">
                    <a
                      href={app.cvLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline hover:text-accent/80"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(app.createdAt || app.appliedAt).toLocaleDateString()}
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

export default MyGuideApplications;

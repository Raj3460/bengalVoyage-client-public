import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import ErrorMessage from "../../../Component/Sheard/ErrorMessage";

const PackageCardDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecureApi();

  // Fetch package details using TanStack Query
  const {
    data: packageDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["packageDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2, // Retry failed requests twice
  });

  if (isLoading) {
    return <LoadingSpinner size="medium" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error.message || "Failed to load package details"}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {packageDetails ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Package Image */}
          <div className="relative h-96 w-full">
            <img
              src={packageDetails.thumbnail}
              alt={packageDetails.title}
              className="w-full h-full object-cover"
            />
            {packageDetails.oldPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded font-bold text-sm uppercase">
                SALE
              </div>
            )}
          </div>

          {/* Package Content */}
          <div className="p-6">
            {/* Price */}
            <div className="mb-4">
              {packageDetails.oldPrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-800">
                    ${packageDetails.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${packageDetails.oldPrice}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-800">
                  ${packageDetails.price}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {packageDetails.title}
            </h1>

            {/* Duration */}
            <p className="text-lg text-gray-600 mb-4">
              {packageDetails.days} DAYS {packageDetails.days - 1} NIGHTS
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-6">{packageDetails.about}</p>

            {/* Tour Plan */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Tour Plan
              </h2>
              <div className="space-y-4">
                {packageDetails.tourPlan?.map((plan, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary pl-4 py-2"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      Day {plan.day}: {plan.headline}
                    </h3>
                    <p className="text-gray-600">{plan.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Departure</h3>
                <p>{packageDetails.departure}</p>
                <p className="mt-2">
                  <span className="font-medium">Time:</span>{" "}
                  {packageDetails.departureTime}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Return</h3>
                <p>{packageDetails.location}</p>
                <p className="mt-2">
                  <span className="font-medium">Time:</span>{" "}
                  {packageDetails.returnTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No package details found</p>
      )}
    </div>
  );
};

export default PackageCardDetails;

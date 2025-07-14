import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import ErrorMessage from "../../../Component/Sheard/ErrorMessage";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaMoneyBillWave, FaUserAlt, FaExclamationCircle } from "react-icons/fa";

const PackageCardDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecureApi();

  const { data: packageDetails, isLoading, isError, error } = useQuery({
    queryKey: ["packageDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner size="large" />;
  if (isError) return <ErrorMessage message={error.message} />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-primary/10 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">{packageDetails.title}</h1>
          <div className="flex justify-center items-center gap-4">
            <span className="flex items-center text-secondary">
              <FaMapMarkerAlt className="mr-1" />
              {packageDetails.destination}
            </span>
            <span className="flex items-center text-accent">
              <FaCalendarAlt className="mr-1" />
              {packageDetails.days} Days {packageDetails.days - 1} Nights
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src={packageDetails.thumbnail}
                alt={packageDetails.title}
                className="w-full h-full object-cover"
              />
              {packageDetails.oldPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm uppercase shadow-lg">
                  SALE
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-bold text-white">${packageDetails.price}</span>
                    {packageDetails.oldPrice && (
                      <span className="ml-2 text-lg text-white/70 line-through">${packageDetails.oldPrice}</span>
                    )}
                  </div>
                  <button className="bg-accent hover:bg-accent/90 text-white font-bold py-2 px-6 rounded-full transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Gallery */}
            {packageDetails.gallery?.length > 0 && (
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
                {packageDetails.gallery.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md h-32">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* About Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">About This Tour</h2>
              <p className="text-gray-700 mb-6">{packageDetails.about}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Destination</h3>
                    <p className="text-gray-600">{packageDetails.destination}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Duration</h3>
                    <p className="text-gray-600">{packageDetails.days} Days {packageDetails.days - 1} Nights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCalendarAlt className="text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Departure</h3>
                    <p className="text-gray-600">{packageDetails.departureTime} from {packageDetails.departure}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUserAlt className="text-secondary mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Tour Type</h3>
                    <p className="text-gray-600 capitalize">{packageDetails.tourType}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tour Plan */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Tour Plan</h2>
              <div className="space-y-6">
                {packageDetails.tourPlan?.map((plan, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex group"
                  >
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        {plan.day}
                      </div>
                      {index < packageDetails.tourPlan.length - 1 && (
                        <div className="w-1 h-full bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                        {plan.headline}
                      </h3>
                      <p className="text-gray-600 mt-2">{plan.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg  top-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">Book This Tour</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-bold text-primary">${packageDetails.price}</span>
                </div>
                {packageDetails.oldPrice && (
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Original Price</span>
                    <span className="line-through">${packageDetails.oldPrice}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Number of Adults</label>
                    <input 
                      type="number" 
                      min="1" 
                      defaultValue="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Number of Children</label>
                    <input 
                      type="number" 
                      min="0" 
                      defaultValue="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded-lg transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Not Included */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">Not Included</h2>
              <ul className="space-y-2">
                {packageDetails.notIncluded?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaExclamationCircle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Related Tours */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">Related Tours</h2>
              <div className="space-y-4">
                {/* You would map through related tours here */}
                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <img 
                    src="https://i.ibb.co/n8cbvG9Q/sundorbon.jpg" 
                    alt="Related tour" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">Sundarbans Adventure</h3>
                    <p className="text-sm text-gray-600">3 Days | ${packageDetails.price}</p>
                  </div>
                </div>
                {/* Add more related tours as needed */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCardDetails;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaUserAlt, 
  FaExclamationCircle,
  FaStar,
  FaRegStar
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmBookingModal from "./ConfirmBookingModal";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import ErrorMessage from "../../../Component/Sheard/ErrorMessage";
import useAuth from "../../../Hooks/useAuth";
import BookingForm from "./BookingForm";

const PackageCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecureApi();
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  // Color definitions - replace with your actual color classes
  const colors = {
    primary: {
      bg: 'bg-indigo-600',
      text: 'text-indigo-600',
      border: 'border-indigo-600',
      hover: 'hover:bg-indigo-700'
    },
    secondary: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-500',
      border: 'border-emerald-500',
      hover: 'hover:bg-emerald-600'
    },
    accent: {
      bg: 'bg-amber-500',
      text: 'text-amber-500',
      border: 'border-amber-500',
      hover: 'hover:bg-amber-600'
    }
  };

  const { data: packageDetails, isLoading, isError, error } = useQuery({
    queryKey: ["packageDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      // Set thumbnail as default image when data loads
      setCurrentImage(data.thumbnail);
    }
  });

  const { data: tourGuides = [] } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guide");
      return res.data;
    },
  });
  // console.log(tourGuides);

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

  const handleBookingSubmit = async (bookingData) => {
    if (!user) {
      navigate("/login", { state: { from: `/packages/${id}` } });
      return;
    }

    const finalBookingData = {
      ...bookingData,
      packageId: packageDetails._id,
      packageName: packageDetails.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      status: "pending"
    };

    try {
      await axiosSecure.post("/bookings", finalBookingData);
      setBookingDetails({
        ...finalBookingData,
        packageImage: packageDetails.thumbnail,
        discount: packageDetails.oldPrice 
          ? packageDetails.oldPrice - packageDetails.price 
          : 0
      });
      setShowModal(true);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const handleGalleryImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Thumbnail as Default */}
       

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Display - Shows current selected image */}
            <motion.div variants={itemVariants} className="relative rounded-xl overflow-hidden shadow-lg h-96">
              <img
                src={currentImage || packageDetails?.thumbnail}
                alt={packageDetails?.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </motion.div>

            {/* Gallery Thumbnails */}
            {packageDetails?.gallery?.length > 0 && (
              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
              >
                {/* Thumbnail as first option */}
                <button
                  onClick={() => handleGalleryImageClick(packageDetails.thumbnail)}
                  className={`rounded-lg overflow-hidden shadow-md h-24 transition-all ${
                    currentImage === packageDetails.thumbnail 
                      ? `ring-4 ${colors.primary.border}` 
                      : `hover:ring-2 ${colors.primary.border}`
                  }`}
                >
                  <img
                    src={packageDetails.thumbnail}
                    alt="Package thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Gallery images */}
                {packageDetails.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleGalleryImageClick(img)}
                    className={`rounded-lg overflow-hidden shadow-md h-24 transition-all ${
                      currentImage === img 
                        ? `ring-4 ${colors.primary.border}` 
                        : `hover:ring-2 ${colors.primary.border}`
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}

            {/* About Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className={`text-2xl font-bold ${colors.primary.text} mb-4`}>About This Tour</h2>
              <p className="text-gray-700 mb-6">{packageDetails?.about}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Info items with colored icons */}
                <div className="flex items-start">
                  <div className={`p-2 ${colors.secondary.bg} bg-opacity-10 rounded-lg mr-3`}>
                    <FaMapMarkerAlt className={colors.secondary.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Destination</h3>
                    <p className="text-gray-600">{packageDetails?.destination}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`p-2 ${colors.primary.bg} bg-opacity-10 rounded-lg mr-3`}>
                    <FaClock className={colors.primary.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Duration</h3>
                    <p className="text-gray-600">{packageDetails?.days} Days {packageDetails?.days - 1} Nights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`p-2 ${colors.accent.bg} bg-opacity-10 rounded-lg mr-3`}>
                    <FaCalendarAlt className={colors.accent.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Departure</h3>
                    <p className="text-gray-600">{packageDetails?.departureTime} from {packageDetails?.departure}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`p-2 ${colors.secondary.bg} bg-opacity-10 rounded-lg mr-3`}>
                    <FaUserAlt className={colors.secondary.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Tour Type</h3>
                    <p className="text-gray-600 capitalize">{packageDetails?.tourType}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tour Plan */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className={`text-2xl font-bold ${colors.primary.text} mb-6`}>Tour Plan</h2>
              <div className="space-y-6">
                {packageDetails?.tourPlan?.map((plan, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex group"
                  >
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-12 h-12 rounded-full ${colors.primary.bg} text-white flex items-center justify-center font-bold text-lg`}>
                        {plan.day}
                      </div>
                      {index < packageDetails.tourPlan.length - 1 && (
                        <div className="w-1 h-full bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className={`text-xl font-semibold text-gray-800 group-hover:${colors.primary.text} transition-colors`}>
                        {plan.headline}
                      </h3>
                      <p className="text-gray-600 mt-2">{plan.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tour Guides Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className={`text-2xl font-bold ${colors.primary.text} mb-6`}>Available Tour Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tourGuides.map((guide) => (
                  <motion.div
                    key={guide._id}
                    whileHover={{ scale: 1.02 }}
                    className={`border ${colors.primary.border} rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer bg-white`}
                    onClick={() => navigate(`/tour-guides/${guide._id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={guide.image} 
                        alt={guide.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="font-bold text-lg text-white">{guide.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">{guide.specialization}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            i < guide.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-1">({guide.reviews} reviews)</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="space-y-6 ">
            <BookingForm
              packageDetails={packageDetails}
              tourGuides={tourGuides}
              user={user}
              onSubmit={handleBookingSubmit}
              colors={colors}
            />

            {/* Not Included */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className={`text-2xl font-bold ${colors.primary.text} mb-4`}>Not Included</h2>
              <ul className="space-y-3">
                {packageDetails?.notIncluded?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaExclamationCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <ConfirmBookingModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onViewBookings={() => navigate("/my-bookings")}
        bookingDetails={bookingDetails}
        colors={colors}
      />
    </motion.div>
  );
};

export default PackageCardDetails;
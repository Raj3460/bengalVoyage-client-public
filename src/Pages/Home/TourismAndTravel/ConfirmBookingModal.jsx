import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCalendarAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const ConfirmBookingModal = ({ isOpen, onClose, onViewBookings, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">
            Your booking has been received and is pending confirmation.
          </p>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <img 
              src={bookingDetails?.packageImage} 
              alt={bookingDetails?.packageName}
              className="w-16 h-16 rounded-lg object-cover mr-3"
            />
            <div>
              <h3 className="font-bold text-gray-900">{bookingDetails?.packageName}</h3>
              <p className="text-sm text-gray-600">Booking ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Date
              </span>
              <span className="font-medium">
                {new Date(bookingDetails?.tourDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaUsers className="mr-2 " />
                Travelers
              </span>
              <span className="font-medium">
                {bookingDetails?.adults} Adults, {bookingDetails?.children} Children
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaMoneyBillWave className="mr-2 text-blue-500" />
                Total Paid
              </span>
              <span className="font-bold text-blue-600">
                ${bookingDetails?.price?.toFixed(2)}
              </span>
            </div>
            {bookingDetails?.discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>You saved</span>
                <span>${bookingDetails.discount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Link to='/dashboard/my_bookings'>
          <button
            onClick={onViewBookings}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            View My Bookings
          </button></Link>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmBookingModal;
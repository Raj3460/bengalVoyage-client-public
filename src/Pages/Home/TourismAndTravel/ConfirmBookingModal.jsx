import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaUsers, 
  FaMoneyBillWave,
  FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConfirmBookingModal = ({ 
  isOpen, 
  onClose, 
  bookingDetails 
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Handle view bookings action
  const handleViewBookings = () => {
    isNavigatingRef.current = true;
    onClose(); // Close the modal first
    
    // Wait for modal close animation to finish
    setTimeout(() => {
      navigate('/dashboard/my_bookings');
    }, 300);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusable = modalRef.current.querySelector('button');
      focusable?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl" />
        </button>

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
              src={bookingDetails?.packageImage || "/default-package.jpg"} 
              alt={bookingDetails?.packageName || "Tour package"}
              className="w-16 h-16 rounded-lg object-cover mr-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-package.jpg";
              }}
            />
            <div>
              <h3 className="font-bold text-gray-900">{bookingDetails?.packageName || "Unknown Package"}</h3>
              <p className="text-sm text-gray-600">
                Booking ID: {bookingDetails?.bookingId || Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Date
              </span>
              <span className="font-medium text-black">
                {bookingDetails?.tourDate ? 
                  new Date(bookingDetails.tourDate).toLocaleDateString() : 
                  "Not specified"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaUsers className="mr-2" />
                Travelers
              </span>
              <span className="font-medium text-black">
                {bookingDetails?.adults || 0} Adults, {bookingDetails?.children || 0} Children
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                <FaMoneyBillWave className="mr-2 text-blue-500" />
                Total Paid
              </span>
              <span className="font-bold text-blue-600">
                {bookingDetails?.price ? 
                  `$${bookingDetails.price.toFixed(2)}` : 
                  "$0.00"}
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

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleViewBookings}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
          >
            View My Bookings
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all"
          >
            Continue Browsing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmBookingModal;
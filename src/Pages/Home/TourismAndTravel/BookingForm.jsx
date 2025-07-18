import React, { useState } from "react";
import { FaCalendarAlt, FaUserAlt, FaChild, FaMoneyBillWave, FaLock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const BookingForm = ({ packageDetails, tourGuides, user, onSubmit, colors }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState("");
  // console.log(tourGuides);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return; // Prevent submission if not logged in
    
    const totalPrice = packageDetails.price * (adults + children * 0.5);
    
    onSubmit({
      price: totalPrice,
      tourDate: startDate,
      tourGuide: selectedGuide,
      adults,
      children
    });
  };

  // Calculate price breakdown
  const adultTotal = packageDetails.price * adults;
  const childrenTotal = packageDetails.price * 0.5 * children;
  const totalPrice = adultTotal + childrenTotal;
  const discount = packageDetails.oldPrice 
    ? (packageDetails.oldPrice - packageDetails.price) * adults 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-base-300 rounded-xl p-6 shadow-lg sticky top-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Tour</h2>
      
      {!user && (
        <div className={`mb-6 p-4 rounded-lg ${colors.primary.bg} bg-opacity-10 border ${colors.primary.border} flex items-start`}>
          <FaLock className={`mt-1 mr-3 ${colors.primary.text}`} />
          <div>
            <h3 className="font-medium text-gray-800">Login Required</h3>
            <p className="text-gray-600 text-sm">Please login to book this tour</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Package Info */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold text-gray-800 mb-2">{packageDetails.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price per adult</span>
            <span className="font-bold text-blue-600">${packageDetails.price}</span>
          </div>
          {packageDetails.oldPrice && (
            <div className="flex justify-between items-center text-gray-500 mt-1">
              <span>Original Price</span>
              <span className="line-through">${packageDetails.oldPrice}</span>
            </div>
          )}
        </div>

        {/* User Info (read-only) */}
        {user && (
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{user.displayName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className={`space-y-4 ${!user ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="text-gray-700 mb-2 flex items-center">
              <FaCalendarAlt className={`mr-2 ${colors.primary.text}`} />
              Tour Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 flex items-center">
              <FaUserAlt className={`mr-2 ${colors.primary.text}`} />
              Number of Adults
            </label>
            <input 
              type="number" 
              min="1" 
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 flex items-center">
              <FaChild className={`mr-2 ${colors.primary.text}`} />
              Number of Children
            </label>
            <input 
              type="number" 
              min="0" 
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 flex items-center">
              <FaUserAlt className={`mr-2 ${colors.primary.text}`} />
              Select Tour Guide
            </label>
            <select
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Select Guide --</option>
              {tourGuides.map((guide) => (
                <option key={guide._id} >
                  {guide.name} 
                </option>
              ))}
            </select>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <div className="flex justify-between font-medium text-gray-800 mb-1">
              <span>Adults ({adults} × ${packageDetails.price})</span>
              <span>${adultTotal.toFixed(2)}</span>
            </div>
            {children > 0 && (
              <div className="flex justify-between font-medium text-gray-800 mb-1">
                <span>Children ({children} × ${(packageDetails.price * 0.5).toFixed(2)})</span>
                <span>${childrenTotal.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm mt-1">
                <span>You save</span>
                <span>${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-gray-900 mt-3 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit"
            className={`w-full ${colors.primary.bg} ${colors.primary.hover} text-white font-bold py-3 px-4 rounded-lg transition-all mt-4 shadow-md`}
            disabled={!user}
          >
            {user ? "Book Now" : "Login to Book"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;
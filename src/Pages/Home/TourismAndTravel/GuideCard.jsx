import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

const GuideCard = ({ guide }) => {
  const {
    name,
    email,
    image,
    _id,
    expertise = [],
    rating,
    bio,
    phone,
    location,
    languages = []
  } = guide;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <>
      {/* Guide Card */}
      <motion.div
        className="text-center p-6 rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary/20 transition-colors"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="flex justify-center mb-4">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <img 
              src={image || "https://via.placeholder.com/150"} 
              alt={name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            {rating && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                ⭐ {rating.toFixed(1)}
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          {expertise.length > 0 && (
            <p className="text-sm text-primary font-medium">
              {expertise.join(" • ")}
            </p>
          )}
          <p className="text-sm text-gray-500 truncate">{email}</p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block mt-4 text-sm px-6 py-2 rounded-full text-white font-bold bg-gradient-to-r from-primary to-primary-dark shadow-md hover:shadow-lg transition-all"
            >
              View Profile
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="p-6">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={image || "https://via.placeholder.com/150"} 
                      alt={name} 
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                    />
                    {rating && (
                      <div className="flex items-center justify-center mt-3">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-bold">{rating.toFixed(1)}</span>
                        <span className="text-gray-500 ml-1">
                          ({Math.floor(rating * 10)} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold ">{name}</h2>
                    {expertise.length > 0 && (
                      <p className="text-primary font-medium mb-2">
                        {expertise.join(" • ")}
                      </p>
                    )}

                    {/* Profile Details */}
                    <div className="space-y-3 mt-4">
                      {bio && <p className="text-gray-700">{bio}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {location && (
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{location}</span>
                          </div>
                        )}

                        {phone && (
                          <div className="flex items-start">
                            <FaPhone className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{phone}</span>
                          </div>
                        )}

                        <div className="flex items-start">
                          <FaEnvelope className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{email}</span>
                        </div>

                        {languages.length > 0 && (
                          <div className="flex items-start">
                            <FaGlobe className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{languages.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Packages Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-3">Tour Packages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1, 2].map((item) => (
                      <div key={item} className="border rounded-lg p-3 hover:bg-gray-50">
                        <h4 className="font-bold text-2xl">Cultural Tour #{item}</h4>
                        <p className="text-sm text-gray-600">3 days • ${150 + item * 50}</p>
                        <div className="flex items-center mt-2">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm">4.{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-2xl bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                 
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideCard;
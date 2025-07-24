import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import UseAxiosSecureApi from '../../Hooks/Api/UseAxiosSecureApi';
import LoadingSpinner from '../Sheard/LoadingSpinner';

const AllTourGuides = () => {
  const axiosSecure = UseAxiosSecureApi();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tourGuides = [], isLoading } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guide");
      return res.data;
    },
  });

  const filteredGuides = tourGuides.filter(guide =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (guide) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGuide(null);
  };

  if (isLoading) return <LoadingSpinner size="large" />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Professional Tour Guides</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Experienced guides to make your journey memorable
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by guide name..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg- shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGuides.map((guide) => (
            <motion.div
              key={guide._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={guide.image || 'https://via.placeholder.com/300x300?text=Guide'}
                  alt={guide.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Guide';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{guide.name}</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      i < (guide.rating || 0) ? <FaStar key={i} /> : <FaRegStar key={i} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({guide.reviews || 0} reviews)
                  </span>
                </div>

                {guide.specialization && (
                  <p className="text-gray-700 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <span className="truncate">{guide.specialization}</span>
                  </p>
                )}

                <button 
                  onClick={() => openModal(guide)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Guide Details */}
       
        {isModalOpen && selectedGuide && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
    >
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={selectedGuide.image || 'https://via.placeholder.com/150?text=Guide'}
              alt={selectedGuide.name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Guide';
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
              <div className="flex items-center bg-yellow-100 rounded-full px-2 py-1">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-xs font-bold text-gray-800">
                  {selectedGuide.rating?.toFixed(1) || 'New'}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedGuide.name}</h2>
            <p className="text-blue-100">
              {selectedGuide.specialization || 'Professional Tour Guide'}
            </p>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            About This Guide
          </h3>
          <p className="text-gray-600">
            {selectedGuide.bio || 'Experienced tour guide with extensive knowledge of local attractions and culture.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <FaEnvelope className="text-blue-500 mr-2" />
              Contact
            </h4>
            <p className="text-gray-600 break-all">{selectedGuide.email}</p>
            {selectedGuide.phone && (
              <p className="text-gray-600 mt-1">{selectedGuide.phone}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              Expertise
            </h4>
            <p className="text-gray-600">
              {selectedGuide.specialization || 'General Tours'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Rating & Reviews</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                i < (selectedGuide.rating || 0) ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-400" />
                )
              ))}
            </div>
           
          </div>
        </div>

        
      </div>
    </motion.div>
  </div>
)}

        {/* No results message */}
        {filteredGuides.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No tour guides found matching your search</h3>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTourGuides;
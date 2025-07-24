import React from 'react';
import { FaMapMarkerAlt, FaStar, FaHotel, FaMoneyBillWave } from 'react-icons/fa';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      image: "https://i.ibb.co/0jQ7ZJq/cox-bazar.jpg",
      description: "World's longest natural sea beach with stunning sunsets",
      rating: 4.8,
      hotels: 120,
      priceRange: "$$",
      highlights: ["Beach Activities", "Seafood", "Water Sports"]
    },
    {
      id: 2,
      name: "Sundarbans",
      image: "https://i.ibb.co/4W0sKqK/sundarbans.jpg",
      description: "Largest mangrove forest and home to the Royal Bengal Tiger",
      rating: 4.9,
      hotels: 45,
      priceRange: "$$$",
      highlights: ["Wildlife Safari", "Boat Tours", "Eco Tourism"]
    },
    {
      id: 3,
      name: "Sylhet",
      image: "https://i.ibb.co/7YtXJ2G/sylhet.jpg",
      description: "Land of tea gardens and rolling hills",
      rating: 4.7,
      hotels: 85,
      priceRange: "$$",
      highlights: ["Tea Gardens", "Waterfalls", "Adventure Trekking"]
    },
    {
      id: 4,
      name: "Bandarban",
      image: "https://i.ibb.co/0J0X9J0/bandarban.jpg",
      description: "Hill district with indigenous culture and scenic beauty",
      rating: 4.6,
      hotels: 60,
      priceRange: "$$",
      highlights: ["Hill Trekking", "Tribal Villages", "Natural Pools"]
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Destinations</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore Bangladesh's most visited and breathtaking locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
                  <span className="text-gray-600 text-sm">{destination.priceRange}</span>
                </div>

                <p className="text-gray-600 text-sm mt-2">{destination.description}</p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FaHotel className="mr-1" />
                  <span>{destination.hotels}+ stays</span>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium">
                  Explore {destination.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
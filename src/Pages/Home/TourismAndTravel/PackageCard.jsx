import React from "react";
import { Link, useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    price,
    oldPrice,
    days,
    about,
    thumbnail,
    
    rating = 5, // Default to 5 stars as shown in reference
  } = pkg;

  const hasDiscount = oldPrice && Number(oldPrice) > Number(price);

  return (
    <div className="w-full overflow-hidden bg-white shadow-md rounded-lg">
      {/* Image container with improved styling */}
      <div className="relative h-48 w-full overflow-hidden group">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = '/default-package.jpg'; // Fallback image
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Discount badge - positioned like reference image */}
        {hasDiscount && (
          <div className="absolute left-0 top-4 bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
            SALE
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Price section */}
        <div className="mb-2">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">${price}</span>
              <span className="text-lg font-medium text-gray-500 line-through">
                ${oldPrice}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-800">Tk:{price}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-xl font-bold text-gray-800 line-clamp-1">{title}</h3>

        {/* Duration */}
        <p className="mb-3 text-sm font-semibold text-gray-600">
          {days} DAYS {days - 1} NIGHTS
        </p>

        {/* Description */}
        <p className="mb-1 line-clamp-2 text-sm text-gray-600">{about}</p>

        {/* Rating and CTA section */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {/* Rating stars with angled background */}
          <div className="relative flex items-center">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-4 w-4" />
              ))}
            </div>
            <div className="absolute -left-4 -top-4 -bottom-4 -right-4 bg-gray-100 -skew-x-12 -z-10"></div>
          </div>
          
          {/* VIEW MORE button with angled edge */}
          <Link 
            to={`/packages/${_id}`}
            className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 transition-colors duration-300"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)"
            }}
          >
            <span className="flex items-center gap-1">
              VIEW MORE <FiArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
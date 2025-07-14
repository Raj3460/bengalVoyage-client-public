import React from "react";
import { useNavigate } from "react-router";
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
    rating = 0, // Assuming 5 stars from the reference image
  } = pkg;

  const hasDiscount = oldPrice && Number(oldPrice) > Number(price);

  return (
    <div className="w-full max-w-screen overflow-hidden  bg-white shadow-md">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute left-0 top-4 bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white">
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
            <span className="text-2xl font-bold text-gray-800">${price}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-xl font-bold text-gray-800">{title}</h3>

        {/* Duration */}
        <p className="mb-3 text-sm font-semibold text-gray-600">
          {days} DAYS {days - 1} NIGHTS
        </p>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{about}</p>

        <div className="flex items-center justify-between border-t border-gray-200">
          {" "}
          {/* Added border-t for separation */}
          {/* Left section: 5 Stars */}
          <div className="flex items-center py-3 pl-4 bg-gray-100 pr-8 relative z-10 before:content-[''] before:absolute before:top-0 before:right-0 before:w-8 before:h-full before:bg-gray-100 before:skew-x-12 before:translate-x-1/2">
            <div className="flex text-yellow-500">
              {" "}
              {/* Changed to yellow-500 for better match with image */}
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
          {/* Right section: VIEW MORE Button */}
          <button
            onClick={() => navigate(`/packages/${_id}`)}
            className="relative flex items-center gap-2 py-3 px-6 bg-blue-500 text-white font-bold uppercase text-sm cursor-pointer
                   hover:bg-blue-600 transition-colors duration-300
                   before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-full before:bg-blue-500 before:-skew-x-12 before:-translate-x-1/2 before:z-0
                   after:content-[''] after:absolute after:top-0 after:left-0 after:w-8 after:h-full after:bg-blue-500 after:-skew-x-12 after:-translate-x-1/2 after:z-0"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)", // This creates the angled cut on the left for the blue section
            }}
          >
            <span className="relative z-10">VIEW MORE</span>{" "}
            {/* z-10 to keep text above pseudo-elements */}
            <FiArrowRight className="h-4 w-4 relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

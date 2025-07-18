import React from "react";
import { Link } from "react-router-dom";

const GuideCard = ({ guide }) => {
  const { name, email, image, _id } = guide;

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border">
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
        <Link
          to={`/guide-profile/${_id}`}
          className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GuideCard;

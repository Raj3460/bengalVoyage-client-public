import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const GuideCard = ({ guide }) => {
  const { name, email, image, _id, expertise, rating } = guide;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="text-center bg-gray-100 p-6  rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary/20 transition-colors"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="flex justify-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <img 
            src={image || "https://via.placeholder.com/150"} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
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
        {expertise && (
          <p className="text-sm text-primary font-medium">
            {expertise.join(" • ")}
          </p>
        )}
        <p className="text-sm text-gray-500 truncate">{email}</p>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={`/guide-profile/${_id}`}
            className="inline-block mt-4 text-sm  font-bold bg-gradient-to-r from-primary text-black to-primary-dark  px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            View Profile
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GuideCard;
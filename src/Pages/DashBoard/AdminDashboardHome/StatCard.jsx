import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 rounded-xl shadow ${color} transition-all hover:shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-white dark:bg-gray-700 bg-opacity-50">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
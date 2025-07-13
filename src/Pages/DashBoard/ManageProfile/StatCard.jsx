import React from "react";

const StatCard = ({ title, value, icon, color, bgColor }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md ${bgColor} dark:bg-opacity-20`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          {React.cloneElement(icon, { className: "text-2xl" })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

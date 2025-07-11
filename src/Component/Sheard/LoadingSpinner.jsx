import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  // Size classes
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
    xlarge: 'h-16 w-16 border-[5px]'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-t-primary border-r-transparent border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-transparent border-b-transparent border-l-transparent',
    gray: 'border-t-gray-500 border-r-transparent border-b-transparent border-l-transparent',
    accent: 'border-t-accent border-r-transparent border-b-transparent border-l-transparent'
  };

  return (
    <div className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}>
      {/* Screen reader text */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
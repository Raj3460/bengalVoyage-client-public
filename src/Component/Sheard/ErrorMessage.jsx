import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry, 
  retryText = 'Try Again',
  className = '',
  iconSize = 'text-2xl',
  textSize = 'text-base'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-lg bg-red-50 border border-red-200 ${className}`}>
      <div className="flex items-center justify-center mb-3">
        <FaExclamationTriangle className={`${iconSize} text-red-500 mr-2`} />
        <h3 className={`${textSize} font-medium text-red-800`}>Error Occurred</h3>
      </div>
      <p className="text-red-600 mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
        >
          {retryText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
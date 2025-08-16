import React from 'react';


const ErrorPage = () => {
       return (
              <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white'>
                     
                     <div className="text-center space-y-4">
                     <h1 className="text-3xl sm:text-5xl font-semibold">Oops!</h1>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">404</h1>
        <p className="text-lg sm:text-xl text-gray-300">Page Not Found</p>
        <p className="text-md sm:text-lg text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
        >
              Go to Home page
        </button>
        
      </div>
              </div>
       );
};

export default ErrorPage;


     
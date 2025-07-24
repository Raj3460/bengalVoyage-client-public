import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Logo = () => {
  return (
   <Link to='/'>
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Image */}
      <div className="w-10 h-10  sm:w-12 sm:h-12 text-primary">
        <img 
          src="/logo2.png"  
          alt="BengalVoyage Logo"
          className="w-full h-full object-contain "
        />
      </div>
      
      {/* Logo Text */}
      <div className='hidden sm:block'>
         <div className="flex flex-col text-primary font-semibold ">
        <span className="text-xl sm:text-2xl font-bol tracking-tight">
          BengalVoyage
        </span>
        <span className="text-xs text-amber-500 font-medium -mt-1">
          Explore Bangladesh
        </span>
      </div>

      </div>
     
    </motion.div></Link>
  );
};

export default Logo;
import React from "react";
import { motion } from "framer-motion";

const VideoOverview = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-16 px-4 "
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          BengalVoyage <span className="text-accent">Overview</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Side - Text Content */}
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2 space-y-6"
          >
            <motion.h3 
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-2xl md:text-3xl font-semibold "
            >
              Discover Bangladesh Like Never Before
            </motion.h3>
            
            <motion.p 
              whileHover={{ scale: 1.01 }}
              className="text-lg "
            >
              BengalVoyage brings you the most comprehensive tourism platform for exploring the hidden gems of Bangladesh. From the Sundarbans to the tea gardens of Sylhet, we've got you covered.
            </motion.p>
            
            <motion.ul 
              variants={containerVariants}
              className="space-y-3"
            >
              {[
                "✓ Curated tour packages for every budget",
                "✓ Certified local tour guides",
                "✓ Easy online booking system",
                "✓ Authentic cultural experiences"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-center text-lg"
                >
                  <span className="mr-2">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <video
                autoPlay
                loop
                muted
                controls
                className="w-full h-auto"
              >
                <source src="/Bengalvoyage.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoOverview;
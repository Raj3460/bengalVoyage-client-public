import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import img from '../../assets/rajkumar.jpg'


const resumeUrl = "https://docs.google.com/document/d/1Lm6KiBy_455-deVzBAkgQ9-Hj7ll10dtBm_a6ntiX3s/export?format=pdf"; 

const MyBanner = () => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br  from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
              <img
                src={img}
                alt="Raj Kumar Sarkar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-500"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h4 className="text-lg md:text-xl text-blue-600 dark:text-blue-400 mb-2 font-medium">
              Hi, I am
            </h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Raj Kumar Sarkar
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
            >
              I specialize in creating performant, responsive, and maintainable
              web applications using <span className="text-blue-600 dark:text-blue-400 font-medium">React</span>, <span className="text-blue-600 dark:text-blue-400 font-medium">TailwindCSS</span>, <span className="text-blue-600 dark:text-blue-400 font-medium">Express.js</span>, and <span className="text-blue-600 dark:text-blue-400 font-medium">MongoDB</span>.
              Let's discuss your next project!
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg"
              >
                <FaDownload />
                Download Resume
              </motion.a>

              <div className="flex gap-4 mt-4 sm:mt-0">
                {[
                  { icon: <FaGithub />, url: "https://github.com/Raj3460" },
                  { icon: <FaLinkedin />, url: "https://linkedin.com/in/rajkumar-sarkar" },
                  { icon: <FaTwitter />, url: "https://x.com/sarkar_raj3460" },
                 
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyBanner;
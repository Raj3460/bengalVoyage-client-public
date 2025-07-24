import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaMobileAlt, FaUserTie } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About <span className="text-blue-600 dark:text-blue-400">Me</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Passionate developer creating digital solutions that matter
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-blue-400 dark:bg-blue-600 opacity-10 animate-pulse"></div>
              </div>
              <div className="relative z-10 text-white text-6xl font-bold">{"</>"}</div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-center py-2 text-sm">
                RajKumar Sarkar
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Full Stack Developer with a Passion for <span className="text-blue-600 dark:text-blue-400">Problem Solving</span>
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I'm a self-taught developer specializing in the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js) with over a year of hands-on experience building web applications. My journey into programming began with a curiosity about how technology solves real-world problems.
              </p>
              
              <p>
                Currently, I'm focused on developing <strong>full-stack applications</strong> with clean architecture, intuitive interfaces, and robust functionality. My projects implement modern technologies like <strong>JWT authentication</strong>, <strong>Firebase integration</strong>, and <strong>responsive design</strong> principles.
              </p>
              
              <p>
                What drives me is the ability to turn ideas into functional products that provide value to users. I believe in writing <strong>clean, maintainable code</strong> while staying updated with industry best practices.
              </p>
            </div>

            {/* Skills Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <FaCode className="text-xl" />, title: "Frontend", desc: "React, Tailwind, JavaScript" },
                { icon: <FaServer className="text-xl" />, title: "Backend", desc: "Node.js, Express, MongoDB" },
                { icon: <FaMobileAlt className="text-xl" />, title: "Mobile", desc: "Responsive Design" },
                { icon: <FaUserTie className="text-xl" />, title: "Soft Skills", desc: "Problem Solving, Communication" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-2">{item.icon}</div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md flex items-center gap-2"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300 shadow-sm flex items-center gap-2"
              >
                Let's Connect
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
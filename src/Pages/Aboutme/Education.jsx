import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { MdSchool, MdDateRange } from "react-icons/md";
import { FaCode } from "react-icons/fa";

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Arts (History)",
      institution: "University of Rajshahi",
      year: "2023 - Present",
      description: "Currently pursuing my degree in History while simultaneously developing my programming skills through self-study and online courses.",
      icon: <FaUniversity className="text-blue-500 text-2xl" />
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Govt. Bangabandhu College",
      year: "2022",
      description: "Completed my higher secondary education with a focus on humanities subjects, while nurturing my growing interest in technology.",
      icon: <MdSchool className="text-blue-500 text-2xl" />
    },
    {
      id: 3,
      degree: "Self-Taught Developer Journey",
      institution: "Online Platforms & Personal Projects",
      year: "2022 - Present",
      description: "Dedicated 1+ year to mastering JavaScript, React, Node.js, and other web technologies through online courses, documentation study, and building personal projects to transition into web development.",
      icon: <FaCode className="text-blue-500 text-2xl" />
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-blue-600 dark:text-blue-400">Education</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Academic background and self-driven development journey
          </p>
        </div>

        <div className="relative">
          {/* Timeline bar */}
          <div className="hidden lg:block absolute left-1/2 h-full w-1 bg-blue-500 dark:bg-blue-400 transform -translate-x-1/2"></div>
          
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 lg:mb-16 flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
            >
              {/* Timeline dot */}
              <div className="hidden lg:flex absolute left-1/2 h-5 w-5 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-2 items-center justify-center z-10">
                <div className="h-3 w-3 bg-white dark:bg-gray-900 rounded-full"></div>
              </div>

              <div className={`lg:w-5/12 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">
                    {edu.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <MdDateRange className="mr-2" />
                  <span>{edu.year}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Transition to Development</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Despite my academic focus in History, I've cultivated a strong passion for web development. 
            Through dedicated self-study, I've acquired skills in JavaScript, React, Node.js, and other modern 
            web technologies, demonstrating my ability to learn complex technical concepts independently.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
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
      icon: <FaUniversity className="text-primary text-2xl" />
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Govt. Bangabandhu College",
      year: "2022",
      description: "Completed my higher secondary education with a focus on humanities subjects, while nurturing my growing interest in technology.",
      icon: <MdSchool className="text-primary text-2xl" />
    },
    {
      id: 3,
      degree: "Self-Taught Developer Journey",
      institution: "Online Platforms & Personal Projects",
      year: "2022 - Present",
      description: "Dedicated 1+ year to mastering JavaScript, React, Node.js, and other web technologies through online courses, documentation study, and building personal projects to transition into web development.",
      icon: <FaCode className="text-primary text-2xl" />
    }
  ];

  return (
    <section id="education" className="py-20 bg-base-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">
            My <span className="text-accent">Education</span>
          </h2>
          <p className="text-lg text-info max-w-2xl mx-auto">
            Academic background and self-driven development journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline bar */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute left-1/2 h-full w-1 bg-primary transform -translate-x-1/2"
          />
          
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative mb-12 lg:mb-16 flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
            >
              {/* Timeline dot with animation */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="hidden lg:flex absolute left-1/2 h-5 w-5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-2 items-center justify-center z-10 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="h-3 w-3 bg-base-100 rounded-full"
                />
              </motion.div>

              {/* Education card */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`lg:w-5/12 p-6 rounded-xl shadow-lg bg-secondary/25 border-l-4 border-primary ${index % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">
                    {edu.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-info mb-4">
                  <MdDateRange className="mr-2" />
                  <span>{edu.year}</span>
                </div>
                
                <p className="text-base-content">
                  {edu.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Transition Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-primary/20 p-6 rounded-xl shadow-lg max-w-3xl mx-auto text-center border-t-4 border-accent"
        >
          <h3 className="text-xl font-bold text-primary mb-3">Transition to Development</h3>
          <p className="text-base-content">
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
import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaMobileAlt, FaUserTie } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-base-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-secondary mb-4"
          >
            About <span className="text-accent">Me</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-info max-w-2xl mx-auto"
          >
            Passionate developer creating digital solutions that matter
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Graphic with Coder Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Coder Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-accent opacity-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-6xl font-bold text-primary-content"
                    >
                      {"</>"}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-primary-content text-center py-2 text-sm">
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
            <h3 className="text-2xl font-semibold text-secondary">
              Full Stack Developer with a Passion for <span className="text-accent">Problem Solving</span>
            </h3>
            
            <div className="space-y-4 text-base-content">
              <p>
                I'm a self-taught developer specializing in the <strong className="text-accent">MERN stack</strong> (MongoDB, Express, React, Node.js) with over a year of hands-on experience building web applications. My journey into programming began with a curiosity about how technology solves real-world problems.
              </p>
              
              <p>
                Currently, I'm focused on developing <strong className="text-accent">full-stack applications</strong> with clean architecture, intuitive interfaces, and robust functionality. My projects implement modern technologies like <strong className="text-accent">JWT authentication</strong>, <strong className="text-accent">Firebase integration</strong>, and <strong className="text-accent">responsive design</strong> principles.
              </p>
              
              <p>
                What drives me is the ability to turn ideas into functional products that provide value to users. I believe in writing <strong className="text-accent">clean, maintainable code</strong> while staying updated with industry best practices.
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
                  className="bg-primary/30 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-base-200"
                >
                  <div className="text-accent mb-2">{item.icon}</div>
                  <h4 className="font-medium text-primary">{item.title}</h4>
                  <p className="text-sm text-base-content">{item.desc}</p>
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
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 py-3 bg-primary text-base-300 rounded-lg hover:bg-primary-focus transition-colors duration-300 shadow-md flex items-center gap-2"
              >
                View My Work
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 border border-accent text-accent bg-secondary/25 rounded-lg hover:bg-accent hover:text-accent-content transition-colors duration-300 shadow-sm flex items-center gap-2"
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
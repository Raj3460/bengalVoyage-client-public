import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiNextdotjs, SiFirebase, SiStripe, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const Skillss = () => {
  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" />, color: "text-orange-500" },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" />, color: "text-blue-500" },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, color: "text-yellow-400" },
    { name: "React", icon: <FaReact className="text-cyan-400" />, color: "text-cyan-400" },
    { name: "React Router", icon: <TbBrandReactNative className="text-pink-500" />, color: "text-pink-500" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" />, color: "text-cyan-500" },
    { name: "DaisyUI", icon: <FaCss3Alt className="text-purple-500" />, color: "text-purple-500" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, color: "text-green-500" },
    { name: "Express", icon: <SiExpress className="text-gray-400" />, color: "text-gray-400" },
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, color: "text-green-600" },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" />, color: "text-black dark:text-white" },
    { name: "Firebase", icon: <SiFirebase className="text-amber-500" />, color: "text-amber-500" },
    { name: "Stripe", icon: <SiStripe className="text-indigo-500" />, color: "text-indigo-500" }
  ];

  return (
    <section className="py-20 bg-base-300">
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
            My <span className="text-accent">Technology Wheel</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-info max-w-2xl mx-auto"
          >
            All my skills arranged in interactive circular formation
          </motion.p>
        </div>

        {/* Skills Wheel Container */}
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-80 h-80 sm:w-96 sm:h-96"
          >
            {/* Central Code Animation */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 3,
                  repeat: Infinity
                }
              }}
              className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-base-100 shadow-xl flex items-center justify-center border-2 border-accent"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="text-4xl text-accent"
              >
                {"</>"}
              </motion.div>
            </motion.div>

            {/* Skills arranged in circle */}
            {skills.map((skill, index) => {
              const angle = (index * 360) / skills.length;
              const radius = 140; // Adjust for different screen sizes
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  whileInView={{ 
                    opacity: 1,
                    x: x,
                    y: y
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.05
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className={`absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-base-100 shadow-md flex items-center justify-center border-2 ${skill.color.replace('text', 'border')} ${skill.color}`}
                  style={{
                    originX: 0,
                    originY: 0
                  }}
                >
                  <div className="text-2xl">
                    {skill.icon}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 px-2 py-1 bg-base-200 rounded-md text-xs whitespace-nowrap"
                  >
                    {skill.name}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skillss;
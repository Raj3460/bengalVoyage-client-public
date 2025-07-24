import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs,
  SiMongodb, SiExpress, SiNextdotjs, SiFirebase, SiStripe, SiTailwindcss
} from "react-icons/si";
import { FaRoute } from "react-icons/fa";
import { GiDaisy } from "react-icons/gi";

const Skillss = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const skills = [
    { name: "HTML", icon: <SiHtml5 className="text-orange-500" />, level: 90 },
    { name: "CSS", icon: <SiCss3 className="text-blue-500" />, level: 85 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 80 },
    { name: "React", icon: <SiReact className="text-blue-400" />, level: 85 },
    { name: "React Router", icon: <FaRoute className="text-pink-500" />, level: 80 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 90 },
    { name: "DaisyUI", icon: <GiDaisy className="text-purple-500" />, level: 75 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 70 },
    { name: "Express.js", icon: <SiExpress className="text-gray-800 dark:text-white" />, level: 75 },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600" />, level: 75 },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" />, level: 70 },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" />, level: 65 },
    { name: "Stripe", icon: <SiStripe className="text-purple-600" />, level: 60 },
  ];

  return (
    <section
      id="skills"
      className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div data-aos="fade-down" className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Technologies I've worked with and my proficiency level
          </p>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden whitespace-nowrap mb-12">
          <div className="inline-block animate-marquee space-x-10">
            {skills.concat(skills).map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center space-x-2 text-xl font-medium text-gray-800 dark:text-white"
              >
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-3">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {skill.level}%
              </span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Skillss;

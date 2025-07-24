import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import hobbyHub1 from '../../assets/hobbyHub1.png';
import hobbyHub2 from '../../assets/hobbyHub2.png';
import hobbyHub3 from '../../assets/hobbyHub3.png';
import hobbyHub4 from '../../assets/hobbyHub4.png';
import StudyMate1 from '../../assets/StudyMate1.png';
import StudyMate2 from '../../assets/StudyMate2.png';
import StudyMate3 from '../../assets/StudyMate3.png';
import StudyMate4 from '../../assets/StudyMate4.png';
import StudyMate5 from '../../assets/StudyMate5.png';
import job1 from '../../assets/job1.png';
import job2 from '../../assets/job2.png';
import job3 from '../../assets/job3.png';
import job4 from '../../assets/job4.png';
import job5 from '../../assets/job5.png';

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="lg:w-1/2 h-64 lg:h-auto relative">
        {project.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${project.title} ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Dots */}
        <div className="absolute bottom-2 w-full flex justify-center gap-1 z-10">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-2 h-2 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="lg:w-1/2 p-6 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiGithub className="mr-2" />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiExternalLink className="mr-2" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  const projects = [
    {
      id: 1,
      title: "HobbyHub",
      description: "A platform where users create, discover, and join hobby-based groups to build social connections.",
      technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
      images: [hobbyHub1, hobbyHub2, hobbyHub3, hobbyHub4],
      github: "https://github.com/Raj3460/b11a10-client-side",
      live: "https://hobby-hub-99513.web.app/",
      featured: true,
    },
    {
      id: 2,
      title: "StudyMate",
      description: "A collaboration platform for students with assignments, peer reviews, and real-time feedback features.",
      technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
      images: [StudyMate3, StudyMate2, StudyMate1, StudyMate4, StudyMate5],
      github: "https://github.com/Raj3460/b11a11-client-side",
      live: "https://study-mate-d0ccd.web.app/",
    },
    {
      id: 3,
      title: "JOB TRACK",
      description: "A job tracking solution for companies, streamlining applications and communication in one place.",
      technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
      images: [job1, job2, job3, job4, job5],
      github: "https://github.com/yourusername/taskapp",
      live: "https://enchanting-connection.surge.sh/",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated selection of my most recent and impactful development work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`transition-all duration-300 ${project.featured ? 'md:col-span-2' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

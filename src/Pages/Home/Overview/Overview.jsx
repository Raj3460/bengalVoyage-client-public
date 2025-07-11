import React from "react";
import { motion } from "framer-motion";
import { FaGlobeAsia, FaHandHoldingUsd, FaLandmark, FaUserAlt } from "react-icons/fa";

const Overview = () => {
  const features = [
    {
      icon: <FaGlobeAsia className="text-3xl " />,
      title: "Diverse Destinations",
      description:
        "Explore Bangladesh's rich diversity from Sundarbans' mangroves to Sylhet's tea gardens and Cox's Bazar's endless beaches.",
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl " />,
      title: "Value for Money",
      description:
        "Enjoy premium experiences at local prices with our carefully negotiated partnerships and direct community connections.",
    },
    {
      icon: <FaLandmark className="text-3xl " />,
      title: "Cultural Heritage",
      description:
        "Discover UNESCO sites like the Sixty Dome Mosque and ancient Buddhist ruins in Paharpur.",
    },
    {
      icon: <FaUserAlt className="text-3xl " />,
      title: "Expert Guides",
      description:
        "Our certified guides share authentic cultural insights and personal stories that bring destinations to life.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b bg-amber-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="">BengalVoyage</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We go beyond tourism to deliver authentic Bangladeshi experiences
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className=" text-xs p-6  "
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full p-6 bg-secondary  ">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Windows Activation Removed */}
      </div>
    </section>
  );
};

export default Overview;

import React from "react";
import { motion } from "framer-motion";
import { FaGlobeAsia, FaHandHoldingUsd, FaLandmark, FaUserAlt } from "react-icons/fa";

const Overview = () => {
  const features = [
    {
      icon: <FaGlobeAsia className="text-3xl" />,
      title: "Diverse Destinations",
      description: "Explore Bangladesh's rich diversity from Sundarbans' mangroves to Sylhet's tea gardens and Cox's Bazar's endless beaches.",
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl" />,
      title: "Value for Money",
      description: "Enjoy premium experiences at local prices with our carefully negotiated partnerships and direct community connections.",
    },
    {
      icon: <FaLandmark className="text-3xl" />,
      title: "Cultural Heritage",
      description: "Discover UNESCO sites like the Sixty Dome Mosque and ancient Buddhist ruins in Paharpur.",
    },
    {
      icon: <FaUserAlt className="text-3xl" />,
      title: "Expert Guides",
      description: "Our certified guides share authentic cultural insights and personal stories that bring destinations to life.",
    },
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold  mb-4">
            Why Choose <span className="text-primary">BengalVoyage</span>?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We go beyond tourism to deliver authentic Bangladeshi experiences
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="mb-6 rounded-full bg-primary/10 text-primary p-5 transition-all duration-300 group-hover:bg-primary/20"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600  text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="btn btn-primary btn-lg px-8 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            Explore Our Tours
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;
import React from 'react';
import { motion } from 'framer-motion';
import { FaSuitcase, FaUmbrellaBeach, FaFirstAid, FaMoneyBillWave, FaMobileAlt, FaPassport } from 'react-icons/fa';

const TravelTipsSection = () => {
  const travelTips = [
    {
      icon: <FaSuitcase className="text-2xl" />,
      title: "Essential Packing",
      tips: [
        "Pack lightweight, quick-dry clothing",
        "Include a basic first-aid kit",
        "Bring portable chargers/power banks",
        
      ],
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <FaPassport className="text-2xl" />,
      title: "Document Safety",
      tips: [
        "Keep digital copies of important documents",
        "Use RFID-blocking wallet for cards",
        "Share itinerary with trusted contacts"
      ],
      bgColor: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: <FaMoneyBillWave className="text-2xl" />,
      title: "Financial Preparedness",
      tips: [
        "Carry multiple payment options",
        "Notify bank about travel plans",
        "Keep emergency cash in separate places"
      ],
      bgColor: "from-green-50 to-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: "Connectivity",
      tips: [
        "Purchase local SIM for data",
        "Download offline maps",
        "Save emergency contacts locally"
      ],
      bgColor: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <FaFirstAid className="text-2xl" />,
      title: "Health & Safety",
      tips: [
        "Research required vaccinations",
        "Pack prescription medications",
        "Stay hydrated and use sunscreen"
      ],
      bgColor: "from-red-50 to-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: <FaUmbrellaBeach className="text-2xl" />,
      title: "Cultural Awareness",
      tips: [
        "Learn basic local phrases",
        "Respect dress codes at religious sites",
        "Understand local tipping customs"
      ],
      bgColor: "from-cyan-50 to-cyan-100",
      iconColor: "text-cyan-600"
    }
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-5 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold  mb-3">
            Traveler's <span className="text-primary">Essential Tips</span>
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Smart advice to make your journey smoother and more enjoyable
          </p>
        </motion.div>

        {/* Animated Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border-y border-gray-200 py-4 mb-12 bg-white shadow-sm"
        >
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...travelTips, ...travelTips].map((tip, index) => (
              <div key={index} className="mx-8 inline-flex items-center">
                <span className={`p-3 rounded-full ${tip.iconColor} bg-white shadow-md mr-3`}>
                  {tip.icon}
                </span>
                <span className="text-lg font-medium text-gray-800">{tip.title}</span>
                <span className="mx-4 text-gray-300 text-xl">•</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelTips.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-full rounded-xl bg-gradient-to-br ${category.bgColor} shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <span className={`p-3 rounded-lg bg-white ${category.iconColor} shadow-sm mr-4`}>
                      {category.icon}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <svg className={`h-5 w-5 ${category.iconColor} mt-0.5 mr-3 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Download Complete Travel Guide
          </button>
        </motion.div> */}
      </div>

      {/* Marquee Animation CSS */}
      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TravelTipsSection;
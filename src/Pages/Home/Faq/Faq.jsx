import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Faq = () => {
  const faqs = [
    {
      question: "What is the Tourism Management System?",
      answer: "Our Tourism Management System is an online platform that helps travelers explore Bangladesh by providing comprehensive information about tourist destinations, tour packages, and local guides."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Register' button in the navigation bar and filling out the registration form with your name, email, and password."
    },
    {
      question: "Can I use the system without creating an account?",
      answer: "Yes, you can browse packages, guides, and stories without an account, but you'll need to register to book tours, share stories, and access other premium features."
    },
    {
      question: "How do I book a tour package?",
      answer: "Navigate to the package you're interested in, click 'View Details', then click 'Book Now' on the package details page. You'll need to be logged in to complete the booking."
    },
    {
      question: "How can I become a tour guide?",
      answer: "Registered users can apply to become tour guides through their dashboard. Navigate to 'Join as tour guide' in your dashboard and submit the application form."
    }
  ];

  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-16 ">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - About Section */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Need Help?</h2>
            <p className=" mb-4 text-sm">
              We've compiled a list of frequently asked questions to help you navigate our Tourism Management System. If you can't find what you're looking for, feel free to contact our support team.
            </p>
            <p className=" text-sm">
              Our platform is designed to make your travel planning experience seamless, whether you're looking for tour packages, local guides, or sharing your travel stories.
            </p>
          </div>

          {/* Right Side - FAQ Section */}
          <div className="lg:w-1/2 p-6  rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-secondary mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-secondary overflow-hidden"
                >
                  <button
                    className={`w-full flex justify-between items-center p-4 text-left hover:bg-secondary/5 transition-colors ${
                      expandedIndex === index ? 'bg-secondary' : 'bg-secondary/40'
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-medium text-sm">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-secondary transition-transform ${
                        expandedIndex === index ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <div
                    className={`px-4 pb-4 transition-all duration-300 ${
                      expandedIndex === index ? 'block' : 'hidden'
                    }`}
                  >
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
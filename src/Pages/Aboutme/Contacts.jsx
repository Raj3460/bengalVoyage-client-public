import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_j9i53we", // ✅ Your Service ID
        "template_seauvcn", // ✅ Your Template ID
        form.current,
        "G236nwGdk94H8FLJC" // ✅ Your Public Key
      )
      .then(
        (result) => {
          setSendStatus("success");
          form.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setSendStatus("error");
        }
      )
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setSendStatus(null), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="py-20 "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold -900 dark:text-white mb-4">
            Get In <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <p className="text-lg -600 dark:-300 max-w-2xl mx-auto">
            Have a project in mind or want to connect? Feel free to reach out!
          </p>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold -800 dark:text-white mb-6">
              Contact Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <FaPhone className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium -800 dark:text-white">Phone</h4>
                  <a
                    href="tel:+8801787893460"
                    className="-600 dark:-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    +8801787893460
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium -800 dark:text-white">Email</h4>
                  <a
                    href="mailto:sarkarrajkumar3460@gmail.com"
                    className="-600 dark:-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    sarkarrajkumar3460@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium -800 dark:text-white">Location</h4>
                  <p className="-600 dark:-400">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-medium -800 dark:text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/Raj3460"
                  target="_blank"
                  whileHover={{ y: -3 }}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full -700 dark:-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <FiGithub />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/raj-kumar-sarkar-04026b346/"
                  target="_blank"
                  whileHover={{ y: -3 }}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full -700 dark:-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <FiLinkedin />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold -800 dark:text-white mb-6">
              Send Me a Message
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block -700 dark:-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name" // ✅ MUST match EmailJS variable
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block -700 dark:-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email" // ✅ MUST match EmailJS variable
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block -700 dark:-300 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message" // ✅ MUST match EmailJS variable
                  rows="5"
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Hello Raj, I would like to..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
              >
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status Message */}
              {sendStatus === "success" && (
                <p className="text-green-600 dark:text-green-400 mt-4">
                  ✅ Message sent successfully!
                </p>
              )}
              {sendStatus === "error" && (
                <p className="text-red-600 dark:text-red-400 mt-4">
                  ❌ Failed to send message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

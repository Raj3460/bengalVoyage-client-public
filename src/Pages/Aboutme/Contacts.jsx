import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_j9i53we",
        "template_seauvcn",
        form.current,
        "G236nwGdk94H8FLJC"
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

  const contactItems = [
    {
      icon: <FaPhone className="text-xl" />,
      title: "Phone",
      content: "+8801787893460",
      href: "tel:+8801787893460"
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      title: "Email",
      content: "sarkarrajkumar3460@gmail.com",
      href: "mailto:sarkarrajkumar3460@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "Location",
      content: "Dhaka, Bangladesh"
    }
  ];

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: "https://github.com/Raj3460",
      label: "GitHub"
    },
    {
      icon: <FiLinkedin />,
      href: "https://www.linkedin.com/in/raj-kumar-sarkar-04026b346/",
      label: "LinkedIn"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-base-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to connect? Feel free to reach out!
          </p>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-primary/10 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-primary/20"
          >
            <motion.h3 
              className="text-2xl font-bold text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact Details
            </motion.h3>

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 hover:bg-primary/5 rounded-lg transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="p-3 bg-accent text-accent-content rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">{item.title}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-secondary hover:text-accent transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-secondary">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="font-medium text-primary mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-primary text-primary-content rounded-full hover:bg-accent hover:text-accent-content transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-base-100 p-8 rounded-xl shadow-lg border border-primary/20"
          >
            <motion.h3
              className="text-2xl font-bold text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Send Me a Message
            </motion.h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-secondary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-base-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-secondary mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-base-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-secondary mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-base-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  placeholder="Hello Raj, I would like to..."
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full bg-accent text-accent-content font-medium py-3 px-6 rounded-lg hover:bg-accent-focus transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin mr-3 h-5 w-5"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
              <AnimatePresence>
                {sendStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                      sendStatus === "success"
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                    }`}
                  >
                    {sendStatus === "success" ? (
                      <BsCheckCircleFill className="text-xl" />
                    ) : (
                      <BsExclamationCircleFill className="text-xl" />
                    )}
                    <span>
                      {sendStatus === "success"
                        ? "Message sent successfully!"
                        : "Failed to send message. Please try again."}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
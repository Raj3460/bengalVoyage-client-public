import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-base-100 text-white pt-16 pb-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="BengalVoyage Logo" 
                className="h-12 w-auto"
                loading="lazy"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                BengalVoyage
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Discover the hidden gems of Bangladesh with our expert guides and curated travel experiences. 
              We make your journey unforgettable.
            </p>
            <div className="flex gap-5">
              <a 
                href="https://www.facebook.com/share/18vEWwDCHi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/sarkarshovo868?utm_source=qr&igsh=MXNkMmEzZ2wxZW9lOQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://x.com/sarkar_raj3460" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-sky-400 transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors text-xl"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-amber-500 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/allTrips" 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link 
                  to="/tour-guides" 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Tour Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/aboutUs" 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-amber-500 inline-block">
              Contact Us
            </h3>
            <address className="not-italic space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
                <p>123 Travel Street, Dhanmondi, Dhaka 1209, Bangladesh</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-amber-400" />
                <a href="tel:+8801787893460" className="hover:text-amber-400 transition-colors">
                  +880 1787893460
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400" />
                <a 
                  href="mailto:sarkarrajkumar3460@gmail.com" 
                  className="hover:text-amber-400 transition-colors"
                >
                  sarkarrajkumar3460@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BengalVoyage. All rights reserved.
          </p>
      
     
    
    
     
     
     
     
     
      
      
        </div>
      </div>
    </footer>
  );
};

export default Footer;
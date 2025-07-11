import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaRegPaperPlane, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
       return (
              <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-12">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
    {/* Logo & About */}
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="BanglaTravel Guide" className="h-10" />
        <span className="text-xl font-bold">BengalVoyage</span>
      </div>
      <p className="text-gray-300">
        Discover the hidden gems of Bangladesh with expert guides and curated travel experiences.
      </p>
      <div className="flex gap-4">
        <a href="#"><FaFacebook className="text-2xl hover:text-blue-500" /></a>
        <a href="#"><FaInstagram className="text-2xl hover:text-pink-500" /></a>
        <a href="#"><FaTwitter className="text-2xl hover:text-sky-400" /></a>
        <a href="#"><FaYoutube className="text-2xl hover:text-red-600" /></a>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-amber-400">Home</a></li>
        <li><a href="/packages" className="hover:text-amber-400">Tour Packages</a></li>
        <li><a href="/guides" className="hover:text-amber-400">Tour Guides</a></li>
        <li><a href="/stories" className="hover:text-amber-400">Travel Stories</a></li>
        <li><a href="/about" className="hover:text-amber-400">About Us</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <address className="not-italic space-y-2">
        <p><FaMapMarkerAlt className="inline mr-2" /> 123 Travel St, Dhaka, Bangladesh</p>
        <p><FaPhone className="inline mr-2" /> +880 1234 567890</p>
        <p><FaEnvelope className="inline mr-2" /> contact@banglatravel.com</p>
      </address>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
      <p className="text-gray-300 mb-2">Subscribe for travel tips and offers!</p>
      <form className="flex gap-2">
        <input 
          type="email" 
          placeholder="Your Email" 
          className="px-3 py-2 rounded text-gray-800 w-full"
          required
        />
        <button type="submit" className="bg-amber-500 hover:bg-amber-600 px-4 rounded">
          <FaRegPaperPlane />
        </button>
      </form>
    </div>
  </div>

  {/* Copyright */}
  <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
    <p>© {new Date().getFullYear()} BanglaTravel Guide. All rights reserved.</p>
  </div>
</footer>
       );
};

export default Footer;
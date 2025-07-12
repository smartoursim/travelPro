import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">TravelPro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate travel planning platform for discovering, planning, and experiencing incredible destinations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="text-gray-400 hover:text-white transition-colors">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/budget-calculator" className="text-gray-400 hover:text-white transition-colors">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link to="/season-guide" className="text-gray-400 hover:text-white transition-colors">
                  Season Guide
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/taj-mahal" className="text-gray-400 hover:text-white transition-colors">
                  Taj Mahal
                </Link>
              </li>
              <li>
                <Link to="/destinations/kerala-backwaters" className="text-gray-400 hover:text-white transition-colors">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link to="/destinations/goa-beaches" className="text-gray-400 hover:text-white transition-colors">
                  Goa Beaches
                </Link>
              </li>
              <li>
                <Link to="/destinations/rajasthan-palaces" className="text-gray-400 hover:text-white transition-colors">
                  Rajasthan Palaces
                </Link>
              </li>
              <li>
                <Link to="/destinations/himachal-mountains" className="text-gray-400 hover:text-white transition-colors">
                  Himachal Mountains
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">info@travelpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                <span className="text-gray-400">
                  123 Travel Street,<br />
                  New Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2024 TravelPro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
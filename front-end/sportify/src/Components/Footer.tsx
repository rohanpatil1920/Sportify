import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext"; // Adjust the path as necessary

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-primary text-primary-foreground"
      }`}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Sportify</h3>
            <p className="mb-4">Book your sports venue with ease</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/venues"
                  className="hover:text-white transition-colors"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Popular Sports</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/venues?sport=football"
                  className="hover:text-white transition-colors"
                >
                  Football
                </Link>
              </li>
              <li>
                <Link
                  to="/venues?sport=tennis"
                  className="hover:text-white transition-colors"
                >
                  Tennis
                </Link>
              </li>
              <li>
                <Link
                  to="/venues?sport=basketball"
                  className="hover:text-white transition-colors"
                >
                  Basketball
                </Link>
              </li>
              <li>
                <Link
                  to="/venues?sport=swimming"
                  className="hover:text-white transition-colors"
                >
                  Swimming
                </Link>
              </li>
              <li>
                <Link
                  to="/venues?sport=golf"
                  className="hover:text-white transition-colors"
                >
                  Golf
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className={`px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "text-gray-900" : "text-gray-900"
                }`}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div
          className={`border-t ${
            isDarkMode ? "border-gray-700" : "border-blue-800"
          } mt-8 pt-8 text-center`}
        >
          <p>&copy; 2023 Sportify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

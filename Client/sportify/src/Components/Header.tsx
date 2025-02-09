import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext"; // Adjust the path as necessary

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header
      className={` ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-primary text-primary-foreground"
      } shadow-md w-full `}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Sportify
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/venues"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Venues
          </Link>
          <Link
            to="/activities"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Play
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Contact
          </Link>
          <Link
            to="/Login"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Login
          </Link>

          <Link
            to="/partner-registration"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Become a Partner
          </Link>
        </div>
      
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 text-2xl"
        >
          &#9776;
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md py-4 px-6">
          <Link
            to="/venues"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Venues
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="block w-full mt-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            {isDarkMode ? "🌙 Enable Dark Mode" : "☀️ Enable Light Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Ripple effect function
  const createRipple = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <nav
      className="shadow-md w-full"
      style={{
        background: 'linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)',
      }}
    >
      <div className="max-w-full mx-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-start ">
            <Link to="/" className="text-xl font-bold text-white focus:text-white">
              <img src="/sportify_logo.png" alt="Sportify" className="h-20 w-auto" />
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              Play
            </Link>
            <Link
              to="/venues"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              Venues
            </Link>
            <Link
              to="/contact"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              About
            </Link>
            <Link
              to="/login"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              Login/Signup
            </Link>
            <Link
              to="/partner-registration"
              className="relative overflow-hidden text-white hover:bg-green-900 hover:text-neutral-50 px-3 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out"
              onMouseDown={createRipple}
            >
              Become Partner
            </Link>
           
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/play"
            className="block text-white hover:bg-green-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            onMouseDown={createRipple}
            onClick={toggleMenu}
          >
            Play
          </Link>
          <Link
            to="/venues"
            className="block text-white hover:bg-green-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            onMouseDown={createRipple}
            onClick={toggleMenu}
          >
            Venues
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:bg-green-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            onMouseDown={createRipple}
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block text-white hover:bg-green-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            onMouseDown={createRipple}
            onClick={toggleMenu}
          >
            Login/Signup
          </Link>
          <Link
            to="/partner-registration"
            className="block text-white hover:bg-green-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            onMouseDown={createRipple}
            onClick={toggleMenu}
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
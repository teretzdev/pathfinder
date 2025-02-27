import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md" aria-label="Main Navigation">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Application Name */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-primary" aria-label="Go to homepage">
            Pathfinder
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0`}
        >
          <li>
            <Link to="/features" className="hover:text-primary" aria-label="Go to Features page">
              Features
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary" aria-label="Go to About page">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary" aria-label="Go to Contact page">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
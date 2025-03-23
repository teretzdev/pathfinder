import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Pathfinder</h1>
          <div className="ml-8 hidden md:flex space-x-4">
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md ${isActive('/dashboard')} hover:bg-gray-700`}
            >
              Dashboard
            </Link>
            <Link 
              to="/diary" 
              className={`px-3 py-2 rounded-md ${isActive('/diary')} hover:bg-gray-700`}
            >
              Diary
            </Link>
          </div>
        </div>
        <div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-primary rounded-md hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
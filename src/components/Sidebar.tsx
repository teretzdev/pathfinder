import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full shadow-md">
      <div className="p-4">
        {/* Application Name */}
        <h2 className="text-2xl font-bold mb-4">Pathfinder</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-4 hover:bg-gray-700 hover:text-primary"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block p-4 hover:bg-gray-700 hover:text-primary"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className="block p-4 hover:bg-gray-700 hover:text-primary"
            >
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

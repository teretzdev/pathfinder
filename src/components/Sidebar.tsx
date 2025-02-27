import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigationLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/settings', label: 'Settings' },
    { to: '/help', label: 'Help' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full shadow-md">
      <div className="p-4">
        {/* Application Name */}
        <h2 className="text-2xl font-bold mb-4">Pathfinder</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {navigationLinks.length > 0 ? (
            navigationLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block p-4 hover:bg-gray-700 hover:text-primary"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400 p-4">No navigation links available.</li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-6">{children}</main>
      <footer className="p-4 bg-gray-800 text-center mt-auto">
        <p>&copy; 2023 Pathfinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
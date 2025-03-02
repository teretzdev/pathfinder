import React from 'react';

const HumanDesignChart: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Human Design Chart</h2>
      <p className="text-gray-300 mb-6">
        Your Human Design chart reveals your energetic blueprint and how you're designed to interact with the world.
      </p>
      <div className="flex justify-center items-center h-64 bg-gray-700 rounded-lg">
        <p className="text-gray-400">Human Design Chart Visualization</p>
      </div>
    </div>
  );
};

export default HumanDesignChart;
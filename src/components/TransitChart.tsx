import React from 'react';

/**
 * TransitChart Component
 * Displays a table of astrological transit information.
 * This component renders a styled table with data about planetary transits.
 */

interface Transit {
  planet: string;
  aspect: string;
  sign: string;
  date: string;
}

const TransitChart: React.FC = () => {
  const transits: Transit[] = [
    { planet: 'Mars', aspect: 'Conjunction', sign: 'Aries', date: '2023-10-01' },
    { planet: 'Venus', aspect: 'Square', sign: 'Cancer', date: '2023-10-02' },
    { planet: 'Mercury', aspect: 'Trine', sign: 'Leo', date: '2023-10-03' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Astrological Transits</h2>
      <p className="text-gray-300 mb-4">
        This table provides an overview of planetary transits and their astrological aspects.
      </p>
      <table className="w-full text-left text-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Planet</th>
            <th className="py-2 px-4 border-b border-gray-700">Aspect</th>
            <th className="py-2 px-4 border-b border-gray-700">Sign</th>
            <th className="py-2 px-4 border-b border-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700">
            <td className="py-2 px-4 border-b border-gray-700">Mars</td>
            <td className="py-2 px-4 border-b border-gray-700">Conjunction</td>
            <td className="py-2 px-4 border-b border-gray-700">Aries</td>
            <td className="py-2 px-4 border-b border-gray-700">2023-10-01</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="py-2 px-4 border-b border-gray-700">Venus</td>
            <td className="py-2 px-4 border-b border-gray-700">Square</td>
            <td className="py-2 px-4 border-b border-gray-700">Cancer</td>
            <td className="py-2 px-4 border-b border-gray-700">2023-10-02</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="py-2 px-4 border-b border-gray-700">Mercury</td>
            <td className="py-2 px-4 border-b border-gray-700">Trine</td>
            <td className="py-2 px-4 border-b border-gray-700">Leo</td>
            <td className="py-2 px-4 border-b border-gray-700">2023-10-03</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransitChart;
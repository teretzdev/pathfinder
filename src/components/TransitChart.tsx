import React from 'react';

/**
 * TransitChart Component
 * Displays a table of astrological transit information.
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
          {transits.map((transit, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-700">{transit.planet}</td>
              <td className="py-2 px-4 border-b border-gray-700">{transit.aspect}</td>
              <td className="py-2 px-4 border-b border-gray-700">{transit.sign}</td>
              <td className="py-2 px-4 border-b border-gray-700">{transit.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransitChart;
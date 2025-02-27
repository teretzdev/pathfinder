import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Connection {
  name: string;
  sharedPatterns: string[];
}

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([
    {
      name: 'Alice',
      sharedPatterns: ['Transit A', 'Transit B', 'Transit C'],
    },
    {
      name: 'Bob',
      sharedPatterns: ['Transit D', 'Transit E'],
    },
  ]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Connections</h1>

        <p className="text-gray-300 text-center">
          Compare your transits and patterns with others to discover shared insights.
        </p>

        <div className="space-y-6">
          {connections.length === 0 ? (
            <p className="text-gray-400 text-center">
              No connections found. Start connecting with others to explore shared patterns!
            </p>
          ) : (
            <ul className="space-y-4">
              {connections.map((connection, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {connection.name}
                  </h2>
                  <p className="text-gray-300">Shared Patterns:</p>
                  <ul className="list-disc list-inside text-gray-400">
                    {connection.sharedPatterns.map((pattern, idx) => (
                      <li key={idx}>{pattern}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Connections;

import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConnectionCard from '../components/ConnectionCard';

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
                <ConnectionCard
                  key={index}
                  name={connection.name}
                  sharedPatterns={connection.sharedPatterns}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Connections;
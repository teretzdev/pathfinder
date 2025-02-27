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

        <section className="space-y-6" aria-labelledby="connections-list">
          {connections.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-400">
                No connections found. Start connecting with others to explore shared patterns!
              </p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => alert('Feature to add connections coming soon!')}
              >
                Add Connection
              </button>
            </section>
          ) : (
            <ul className="space-y-4">
              {connections.map(({ name, sharedPatterns }, index) => (
                <ConnectionCard
                  key={index}
                  name={name}
                  sharedPatterns={sharedPatterns}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Connections;
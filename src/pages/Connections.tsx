import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ConnectionCard from '../components/ConnectionCard';
import connectionService from '../services/connectionService';

interface Connection {
  name: string;
  sharedPatterns: string[];
}

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const userId = 1; // Replace with dynamic user ID if available
        const fetchedConnections = await connectionService.fetchConnections(userId);
        setConnections(
          fetchedConnections.map((connection) => ({
            name: connection.connectedUserId, // Replace with actual user name if available
            sharedPatterns: connection.sharedPatterns,
          }))
        );
      } catch (err) {
        setError('Failed to load connections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Connections</h1>
        <p className="text-gray-300 text-center">
          Compare your transits and patterns with others to discover shared insights.
        </p>
        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-400 text-center">Loading connections...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : connections.length === 0 ? (
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
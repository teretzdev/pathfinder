import React from 'react';
import Layout from '../components/Layout';
import BiorhythmChart from '../components/BiorhythmChart';
import HumanDesignChart from '../components/HumanDesignChart';
import TransitChart from '../components/TransitChart';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>

        {/* Daily Transits Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daily Transits</h2>
          <p className="text-gray-300">
            Explore the astrological transits influencing your day.
          </p>
          {/* Placeholder for transit data */}
          <div className="mt-4">
            <TransitChart />
          </div>
        </section>

        {/* Biorhythms Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Biorhythms</h2>
          <p className="text-gray-300">
            Track your physical, emotional, and intellectual cycles.
          </p>
          {/* Placeholder for biorhythm chart */}
          <div className="mt-4">
            <BiorhythmChart />
          </div>
        </section>

        {/* Human Design Insights Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Human Design Insights</h2>
          <p className="text-gray-300">
            Gain insights into your unique human design.
          </p>
          {/* Placeholder for human design chart */}
          <div className="mt-4">
            <HumanDesignChart />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
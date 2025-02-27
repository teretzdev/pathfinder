import React from 'react';
import Layout from '../components/Layout';
import BiorhythmChart from '../components/BiorhythmChart';
import HumanDesignChart from '../components/HumanDesignChart';
import TransitChart from '../components/TransitChart';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daily Transits</h2>
          <p className="text-gray-300">
            Explore the astrological transits influencing your day.
          </p>
          <div className="mt-4">
            <TransitChart />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Biorhythms</h2>
          <p className="text-gray-300">
            Track your physical, emotional, and intellectual cycles.
          </p>
          <div className="mt-4">
            <BiorhythmChart />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Human Design Insights</h2>
          <p className="text-gray-300">
            Gain insights into your unique human design.
          </p>
          <div className="mt-4">
            <HumanDesignChart />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
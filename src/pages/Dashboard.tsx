import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import BiorhythmChart from '../components/BiorhythmChart';
import HumanDesignChart from '../components/HumanDesignChart';
import TransitChart from '../components/TransitChart';
import useLogger from '../utils/useLogger';

const Dashboard: React.FC = () => {
  const logger = useLogger('Dashboard');
  
  useEffect(() => {
    logger.info('Dashboard component mounted');
    
    // Log performance metrics
    const performanceMetrics = {
      memory: window.performance.memory ? {
        jsHeapSizeLimit: Math.round(window.performance.memory.jsHeapSizeLimit / (1024 * 1024)),
        totalJSHeapSize: Math.round(window.performance.memory.totalJSHeapSize / (1024 * 1024)),
        usedJSHeapSize: Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024))
      } : 'Not available',
      timing: {
        navigationStart: window.performance.timing.navigationStart,
        loadEventEnd: window.performance.timing.loadEventEnd,
        loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
      }
    };
    
    logger.debug('Performance metrics', performanceMetrics);
    
    return () => {
      logger.info('Dashboard component unmounted');
    };
  }, [logger]);

  logger.trace('Rendering Dashboard component');

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
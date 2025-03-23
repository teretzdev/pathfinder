import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BiorhythmChart from '../components/BiorhythmChart';
import HumanDesignChart from '../components/HumanDesignChart';
import TransitChart from '../components/TransitChart';
import useLogger from '../utils/useLogger';

const Dashboard: React.FC = () => {
  const logger = useLogger('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    logger.info('Dashboard component mounted');
    
    // Simulate loading data
    const loadData = async () => {
      try {
        logger.debug('Loading dashboard data');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
        logger.info('Dashboard data loaded successfully');
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        logger.error('Failed to load dashboard data', { error: errorMessage });
        setError('Failed to load dashboard data. Please try again.');
        setIsLoading(false);
      }
    };
    
    loadData();
    
    return () => {
      logger.info('Dashboard component unmounted');
    };
  }, [logger]);

  // Log when rendering
  logger.trace('Rendering Dashboard component', { isLoading, hasError: !!error });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </Layout>
    );
  }

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
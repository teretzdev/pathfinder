import React, { useState } from 'react';
import Layout from '../components/Layout';
import LogViewer from '../components/LogViewer';
import useLogger from '../utils/useLogger';
import { exportLogs } from '../utils/logExporter';

const DevTools: React.FC = () => {
  const logger = useLogger('DevTools');
  const [logLevel, setLogLevel] = useState('info');
  const [logMessage, setLogMessage] = useState('');
  
  // Generate test logs
  const generateTestLog = () => {
    if (!logMessage) {
      logger.warn('Cannot generate empty log message');
      return;
    }
    
    switch (logLevel) {
      case 'error':
        logger.error(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      case 'warn':
        logger.warn(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      case 'info':
        logger.info(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      case 'http':
        logger.http(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      case 'debug':
        logger.debug(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      case 'trace':
        logger.trace(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
        break;
      default:
        logger.info(logMessage, { source: 'manual', timestamp: new Date().toISOString() });
    }
    
    setLogMessage('');
  };
  
  // Generate a series of test logs
  const generateTestLogs = () => {
    logger.info('Generating test logs', { count: 10 });
    
    logger.error('This is an error log', { errorCode: 500 });
    logger.warn('This is a warning log', { warningCode: 400 });
    logger.info('This is an info log', { user: 'test-user' });
    logger.http('GET /api/users', { status: 200, duration: '120ms' });
    logger.debug('User authentication process', { steps: ['validate', 'authorize', 'redirect'] });
    logger.trace('Detailed function execution', { 
      function: 'processData', 
      args: { id: 123 }, 
      result: { success: true } 
    });
    
    // Log with error object
    try {
      throw new Error('Test error');
    } catch (error) {
      logger.error('Caught an error', { error });
    }
    
    // Performance log
    logger.debug('Performance measurement', {
      timing: {
        domLoading: window.performance.timing.domLoading,
        domComplete: window.performance.timing.domComplete,
        loadTime: window.performance.timing.domComplete - window.performance.timing.domLoading
      }
    });
    
    // User action log
    logger.info('User action', {
      action: 'button_click',
      element: 'generate_logs_button',
      timestamp: new Date().toISOString()
    });
    
    // Application state log
    logger.debug('Application state', {
      route: window.location.pathname,
      query: window.location.search,
      userAgent: navigator.userAgent
    });
  };
  
  // Export logs
  const handleExportLogs = (format: 'json' | 'csv') => {
    logger.info(`Exporting logs in ${format} format`);
    exportLogs(format);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center">Developer Tools</h1>
        
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Log Generator</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="logLevel" className="block text-sm font-medium text-gray-300 mb-1">
                  Log Level
                </label>
                <select
                  id="logLevel"
                  value={logLevel}
                  onChange={(e) => setLogLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="http">HTTP</option>
                  <option value="debug">Debug</option>
                  <option value="trace">Trace</option>
                </select>
              </div>
              
              <div className="flex-grow">
                <label htmlFor="logMessage" className="block text-sm font-medium text-gray-300 mb-1">
                  Log Message
                </label>
                <input
                  type="text"
                  id="logMessage"
                  value={logMessage}
                  onChange={(e) => setLogMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Enter log message"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={generateTestLog}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
                disabled={!logMessage}
              >
                Generate Log
              </button>
              
              <button
                onClick={generateTestLogs}
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90"
              >
                Generate Sample Logs
              </button>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Log Viewer</h2>
          <LogViewer maxEntries={100} />
        </section>
        
        <section className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Log Export</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleExportLogs('json')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export as JSON
            </button>
            <button
              onClick={() => handleExportLogs('csv')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Export as CSV
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DevTools;
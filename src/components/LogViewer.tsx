import React, { useState, useEffect } from 'react';
import useLogger from '../utils/useLogger';
import { LogStorage, LogEntry, exportLogs } from '../utils/logExporter';

interface LogViewerProps {
  maxEntries?: number;
}

const LogViewer: React.FC<LogViewerProps> = ({ maxEntries = 100 }) => {
  const logger = useLogger('LogViewer');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  
  // Get logs from storage
  useEffect(() => {
    logger.info('LogViewer component mounted');
    
    // Initialize log storage
    const storage = LogStorage.getInstance();
    storage.setMaxEntries(maxEntries);
    
    // Initial load of logs
    setLogs(storage.getLogs());
    
    // Set up auto-refresh if enabled
    let intervalId: number | undefined;
    
    if (autoRefresh) {
      intervalId = window.setInterval(() => {
        setLogs(storage.getLogs());
      }, 1000) as unknown as number;
    }
    
    return () => {
      logger.info('LogViewer component unmounted');
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [logger, maxEntries, autoRefresh]);
  
  // Filter logs based on search and level
  const filteredLogs = logs.filter(log => {
    const matchesSearch = filter === '' || 
      log.message.toLowerCase().includes(filter.toLowerCase()) ||
      JSON.stringify(log.meta).toLowerCase().includes(filter.toLowerCase());
      
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });
  
  // Get log level color
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'error': return 'text-red-500';
      case 'warn': return 'text-yellow-500';
      case 'info': return 'text-green-500';
      case 'http': return 'text-purple-500';
      case 'debug': return 'text-blue-500';
      case 'trace': return 'text-cyan-500';
      default: return 'text-gray-500';
    }
  };
  
  // Handle log export
  const handleExport = (format: 'json' | 'csv') => {
    logger.info(`Exporting logs in ${format} format`);
    exportLogs(format);
  };
  
  // Clear logs
  const handleClearLogs = () => {
    logger.info('Clearing logs');
    const storage = LogStorage.getInstance();
    storage.clearLogs();
    setLogs([]);
  };
  
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-96 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Log Viewer</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Filter logs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-sm"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-sm"
          >
            <option value="all">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="http">HTTP</option>
            <option value="debug">Debug</option>
            <option value="trace">Trace</option>
          </select>
          <button
            onClick={handleClearLogs}
            className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-sm hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoRefresh"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="autoRefresh" className="text-sm text-gray-300">Auto-refresh</label>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('json')}
            className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Export JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {filteredLogs.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No logs to display</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="p-2">Time</th>
                <th className="p-2">Level</th>
                <th className="p-2">Message</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index} className="border-t border-gray-800">
                  <td className="p-2 text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className={`p-2 ${getLevelColor(log.level)}`}>{log.level.toUpperCase()}</td>
                  <td className="p-2 text-white">{log.message}</td>
                  <td className="p-2 text-gray-400">
                    <pre className="whitespace-pre-wrap">
                      {Object.keys(log.meta).length > 0 ? JSON.stringify(log.meta, null, 2) : ''}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
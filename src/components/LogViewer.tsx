import React, { useState, useEffect } from 'react';
import useLogger from '../utils/useLogger';

interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  meta: Record<string, unknown>;
}

interface LogViewerProps {
  maxEntries?: number;
}

const LogViewer: React.FC<LogViewerProps> = ({ maxEntries = 100 }) => {
  const logger = useLogger('LogViewer');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  
  // Subscribe to log events
  useEffect(() => {
    logger.info('LogViewer component mounted');
    
    // This is a mock implementation since we can't directly subscribe to logger events
    // In a real implementation, you would use a custom event system or WebSocket
    const mockLogListener = (event: CustomEvent<LogEntry>) => {
      setLogs(prevLogs => {
        const newLogs = [...prevLogs, event.detail];
        // Keep only the most recent logs
        return newLogs.slice(-maxEntries);
      });
    };
    
    // Create a custom event for logging
    const logEvent = new CustomEvent('log', {
      detail: {
        level: 'info',
        message: 'LogViewer initialized',
        timestamp: new Date().toISOString(),
        meta: { component: 'LogViewer' }
      }
    });
    
    // Dispatch the event
    window.dispatchEvent(logEvent);
    
    // Add event listener
    window.addEventListener('log' as any, mockLogListener);
    
    return () => {
      logger.info('LogViewer component unmounted');
      window.removeEventListener('log' as any, mockLogListener);
    };
  }, [logger, maxEntries]);
  
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
            onClick={() => setLogs([])}
            className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-sm hover:bg-gray-700"
          >
            Clear
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
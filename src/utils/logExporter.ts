import frontendLogger from './logger';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  meta: Record<string, unknown>;
}

/**
 * In-memory log storage
 */
class LogStorage {
  private static instance: LogStorage;
  private logs: LogEntry[] = [];
  private maxEntries: number = 1000;
  private isProduction: boolean = import.meta.env.VITE_APP_ENV === 'production';
  
  private constructor() {
    // Private constructor to enforce singleton pattern
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): LogStorage {
    if (!LogStorage.instance) {
      LogStorage.instance = new LogStorage();
    }
    return LogStorage.instance;
  }
  
  /**
   * Add a log entry to storage
   */
  public addLog(entry: LogEntry): void {
    // In production, only store errors and warnings
    if (this.isProduction && !['error', 'warn'].includes(entry.level)) {
      return;
    }
    
    this.logs.push(entry);
    
    // Keep logs under the maximum size
    if (this.logs.length > this.maxEntries) {
      this.logs.shift();
    }
  }
  
  /**
   * Get all stored logs
   */
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }
  
  /**
   * Clear all logs
   */
  public clearLogs(): void {
    this.logs = [];
  }
  
  /**
   * Set maximum number of entries to store
   */
  public setMaxEntries(max: number): void {
    this.maxEntries = max;
    
    // Trim logs if needed
    if (this.logs.length > this.maxEntries) {
      this.logs = this.logs.slice(-this.maxEntries);
    }
  }
  
  /**
   * Filter logs by criteria
   */
  public filterLogs(options: {
    level?: string;
    search?: string;
    startTime?: Date;
    endTime?: Date;
  }): LogEntry[] {
    return this.logs.filter(log => {
      // Filter by log level
      if (options.level && log.level !== options.level) {
        return false;
      }
      
      // Filter by search term
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        const messageMatch = log.message.toLowerCase().includes(searchTerm);
        const metaMatch = JSON.stringify(log.meta).toLowerCase().includes(searchTerm);
        if (!messageMatch && !metaMatch) {
          return false;
        }
      }
      
      // Filter by time range
      if (options.startTime) {
        const logTime = new Date(log.timestamp);
        if (logTime < options.startTime) {
          return false;
        }
      }
      
      if (options.endTime) {
        const logTime = new Date(log.timestamp);
        if (logTime > options.endTime) {
          return false;
        }
      }
      
      return true;
    });
  }
}

/**
 * Initialize the log storage and hook into the logger
 */
const initLogStorage = (): void => {
  const storage = LogStorage.getInstance();
  
  // In production, we might want to limit the log storage size
  if (import.meta.env.VITE_APP_ENV === 'production') {
    storage.setMaxEntries(500); // Store fewer logs in production
  } else {
    storage.setMaxEntries(1000);
  }
  
  // Override console methods to capture logs
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;
  const originalConsoleDebug = console.debug;
  
  // Helper to extract log level from formatted log message
  const extractLogLevel = (args: any[]): string => {
    if (args.length > 0 && typeof args[0] === 'string') {
      const message = args[0];
      if (message.includes('[ERROR]')) return 'error';
      if (message.includes('[WARN]')) return 'warn';
      if (message.includes('[INFO]')) return 'info';
      if (message.includes('[HTTP]')) return 'http';
      if (message.includes('[DEBUG]')) return 'debug';
      if (message.includes('[TRACE]')) return 'trace';
    }
    return 'info';
  };
  
  // Helper to extract message from formatted log
  const extractMessage = (args: any[]): string => {
    if (args.length > 0 && typeof args[0] === 'string') {
      const parts = args[0].split(']');
      if (parts.length > 1) {
        return parts.slice(1).join(']').trim();
      }
      return args[0];
    }
    return JSON.stringify(args);
  };
  
  // Helper to extract metadata
  const extractMeta = (args: any[]): Record<string, unknown> => {
    if (args.length > 1) {
      return args.slice(1).reduce((acc, arg, index) => {
        if (typeof arg === 'object' && arg !== null) {
          return { ...acc, ...arg };
        }
        return { ...acc, [`arg${index + 1}`]: arg };
      }, {});
    }
    return {};
  };
  
  // Override console methods
  console.log = function(...args: any[]) {
    originalConsoleLog.apply(console, args);
    
    storage.addLog({
      timestamp: new Date().toISOString(),
      level: extractLogLevel(args),
      message: extractMessage(args),
      meta: extractMeta(args)
    });
  };
  
  console.info = function(...args: any[]) {
    originalConsoleInfo.apply(console, args);
    
    storage.addLog({
      timestamp: new Date().toISOString(),
      level: 'info',
      message: extractMessage(args),
      meta: extractMeta(args)
    });
  };
  
  console.warn = function(...args: any[]) {
    originalConsoleWarn.apply(console, args);
    
    storage.addLog({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message: extractMessage(args),
      meta: extractMeta(args)
    });
  };
  
  console.error = function(...args: any[]) {
    originalConsoleError.apply(console, args);
    
    storage.addLog({
      timestamp: new Date().toISOString(),
      level: 'error',
      message: extractMessage(args),
      meta: extractMeta(args)
    });
  };
  
  console.debug = function(...args: any[]) {
    originalConsoleDebug.apply(console, args);
    
    storage.addLog({
      timestamp: new Date().toISOString(),
      level: 'debug',
      message: extractMessage(args),
      meta: extractMeta(args)
    });
  };
  
  // Log that we've initialized the storage
  frontendLogger.info('Log storage initialized', { 
    maxEntries: import.meta.env.VITE_APP_ENV === 'production' ? 500 : 1000,
    environment: import.meta.env.VITE_APP_ENV
  });
};

/**
 * Export logs to a file
 */
const exportLogs = (format: 'json' | 'csv' = 'json'): void => {
  const storage = LogStorage.getInstance();
  const logs = storage.getLogs();
  
  if (logs.length === 0) {
    frontendLogger.warn('No logs to export');
    return;
  }
  
  let content: string;
  let mimeType: string;
  let fileExtension: string;
  
  if (format === 'csv') {
    // Convert to CSV
    const headers = 'Timestamp,Level,Message,Metadata\\n';
    const rows = logs.map(log => {
      const timestamp = log.timestamp;
      const level = log.level;
      const message = `"${log.message.replace(/"/g, '""')}"`;
      const meta = `"${JSON.stringify(log.meta).replace(/"/g, '""')}"`;
      return `${timestamp},${level},${message},${meta}`;
    }).join('\\n');
    
    content = headers + rows;
    mimeType = 'text/csv';
    fileExtension = 'csv';
  } else {
    // Convert to JSON
    content = JSON.stringify(logs, null, 2);
    mimeType = 'application/json';
    fileExtension = 'json';
  }
  
  // Create a blob and download link
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set link properties
  link.href = url;
  link.download = `pathfinder-logs-${new Date().toISOString()}.${fileExtension}`;
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
  
  frontendLogger.info('Logs exported successfully', { format, count: logs.length });
};

// Export the log storage and utilities
export { LogStorage, initLogStorage, exportLogs };
export type { LogEntry };
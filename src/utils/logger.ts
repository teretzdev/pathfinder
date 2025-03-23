import { createLogger, format, transports } from 'winston';

// Define custom log levels with more granularity
const logLevels = {
  error: 0,   // Error events, functionality is affected
  warn: 1,    // Warning events, functionality is not affected but something unexpected happened
  info: 2,    // Informational messages about normal application flow
  http: 3,    // HTTP request-specific logs
  debug: 4,   // Detailed debug information
  trace: 5    // Very detailed tracing information
};

// Define log level colors for console output
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  trace: 'cyan'
};

// Determine the current environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Set default log level based on environment
const defaultLogLevel = isProduction ? 'info' : isDevelopment ? 'debug' : 'warn';

// Create custom format for structured logging
const structuredFormat = format.printf(({ timestamp, level, message, context = {}, ...meta }) => {
  // Combine context and meta
  const allMeta = { ...context, ...meta };
  const metaString = Object.keys(allMeta).length ? JSON.stringify(allMeta) : '';
  
  return `${timestamp} [${level.toUpperCase()}] ${message} ${metaString}`;
});

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.errors({ stack: true }),
  format.splat(),
  format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  format.colorize({ all: true }),
  structuredFormat
);

// Create logger instance
const winstonLogger = createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new transports.Console({
      level: process.env.VITE_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

// Browser-specific console logging with styling
const browserLog = (level: string, message: string, meta: Record<string, unknown> = {}) => {
  const timestamp = new Date().toISOString();
  const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  
  // Define styles for different log levels
  const styles: Record<string, string> = {
    error: 'color: #FF5252; font-weight: bold',
    warn: 'color: #FFC107; font-weight: bold',
    info: 'color: #4CAF50; font-weight: bold',
    http: 'color: #E040FB; font-weight: bold',
    debug: 'color: #2196F3; font-weight: bold',
    trace: 'color: #00BCD4; font-weight: bold',
  };
  
  // Log to browser console with styling
  if (level === 'error') {
    console.error(`%c${timestamp} [${level.toUpperCase()}] ${message}`, styles[level], metaString);
  } else if (level === 'warn') {
    console.warn(`%c${timestamp} [${level.toUpperCase()}] ${message}`, styles[level], metaString);
  } else {
    console.log(`%c${timestamp} [${level.toUpperCase()}] ${message}`, styles[level], metaString);
  }
  
  // Also log to winston (useful for environments where winston works in browser)
  winstonLogger.log(level, message, meta);
};

/**
 * Logger utility for the frontend.
 * Provides consistent logging with different log levels and context information.
 */
const createContextLogger = (context: Record<string, unknown> = {}) => {
  return {
    error: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('error', message, { ...context, ...meta }),
    
    warn: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('warn', message, { ...context, ...meta }),
    
    info: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('info', message, { ...context, ...meta }),
    
    http: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('http', message, { ...context, ...meta }),
    
    debug: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('debug', message, { ...context, ...meta }),
    
    trace: (message: string, meta: Record<string, unknown> = {}) => 
      browserLog('trace', message, { ...context, ...meta }),
    
    // Create a new logger with additional context
    child: (additionalContext: Record<string, unknown> = {}) => 
      createContextLogger({ ...context, ...additionalContext })
  };
};

// Create the default logger
const frontendLogger = createContextLogger();

// Export both the default logger and the factory function
export default frontendLogger;
export { createContextLogger };
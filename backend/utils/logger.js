import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define custom log levels with more granularity
const logLevels = {
  fatal: 0,   // Application is unusable, immediate attention required
  error: 1,   // Error events, functionality is affected
  warn: 2,    // Warning events, functionality is not affected but something unexpected happened
  info: 3,    // Informational messages about normal application flow
  http: 4,    // HTTP request-specific logs
  debug: 5,   // Detailed debug information
  trace: 6    // Very detailed tracing information
};

// Define log level colors for console output
const logColors = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  trace: 'cyan'
};

// Apply colors to Winston
winston.addColors(logColors);

// Determine the current environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Set default log level based on environment
const defaultLogLevel = isProduction ? 'info' : isDevelopment ? 'debug' : 'warn';

// Create custom format for structured logging
const structuredFormat = winston.format.printf(({ timestamp, level, message, context = {}, ...meta }) => {
  // Combine context and meta
  const allMeta = { ...context, ...meta };
  const metaString = Object.keys(allMeta).length ? JSON.stringify(allMeta) : '';
  
  return `${timestamp} [${level.toUpperCase()}] ${message} ${metaString}`;
});

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  isProduction ? winston.format.json() : winston.format.colorize({ all: true }),
  structuredFormat
);

// Define transports
const transports = [
  // Always log to console
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || defaultLogLevel,
  }),
  
  // Log errors to a dedicated file
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    tailable: true
  }),
  
  // Log all output to a combined file
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    level: process.env.LOG_LEVEL || defaultLogLevel,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    tailable: true
  }),
  
  // HTTP requests to a separate file
  new winston.transports.File({
    filename: path.join(logsDir, 'http.log'),
    level: 'http',
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    tailable: true
  })
];

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports,
  exitOnError: false, // Prevent the logger from exiting on error
  silent: isTest, // Disable logging during tests
});

// Add convenience methods for context logging
const createContextLogger = (context = {}) => {
  return {
    fatal: (message, meta = {}) => logger.log('fatal', message, { context, ...meta }),
    error: (message, meta = {}) => logger.log('error', message, { context, ...meta }),
    warn: (message, meta = {}) => logger.log('warn', message, { context, ...meta }),
    info: (message, meta = {}) => logger.log('info', message, { context, ...meta }),
    http: (message, meta = {}) => logger.log('http', message, { context, ...meta }),
    debug: (message, meta = {}) => logger.log('debug', message, { context, ...meta }),
    trace: (message, meta = {}) => logger.log('trace', message, { context, ...meta }),
    // Create a new logger with additional context
    child: (additionalContext = {}) => createContextLogger({ ...context, ...additionalContext })
  };
};

// Export both the raw logger and the context logger factory
export default createContextLogger();
export { createContextLogger };
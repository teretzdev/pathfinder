import { createLogger, format, transports } from 'winston';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
  })
);

// Create logger instance
const logger = createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    }),
  ],
});

/**
 * Logger utility for the frontend.
 * Provides consistent logging with different log levels and context information.
 */
const frontendLogger = {
  error: (message: string, meta?: Record<string, unknown>) => {
    logger.log('error', message, meta);
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    logger.log('warn', message, meta);
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    logger.log('info', message, meta);
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    logger.log('debug', message, meta);
  },
};

export default frontendLogger;

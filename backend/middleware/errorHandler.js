import logger from '../utils/logger.js';

/**
 * Global error handling middleware
 * @param {Error} err - The error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Use request logger if available, otherwise use default logger
  const log = req.logger || logger;
  
  // Get error details
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const stack = err.stack;
  const errorId = `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Log the error with context
  log.error(`Error occurred: ${message}`, {
    errorId,
    statusCode,
    stack,
    path: req.originalUrl,
    method: req.method
  });
  
  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      errorId,
      ...(process.env.NODE_ENV !== 'production' && { stack })
    }
  });
};

export default errorHandler;
import logger from '../utils/logger.js';

/**
 * Middleware for logging HTTP requests
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
const requestLogger = (req, res, next) => {
  // Get request details
  const { method, originalUrl, ip, headers } = req;
  const userAgent = headers['user-agent'] || 'Unknown';
  const requestId = headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Add request ID to response headers for tracking
  res.setHeader('X-Request-ID', requestId);
  
  // Create a child logger with request context
  const requestLogger = logger.child({
    requestId,
    method,
    url: originalUrl,
    ip,
    userAgent
  });
  
  // Log the request
  requestLogger.http(`Request received: ${method} ${originalUrl}`);
  
  // Record start time
  const start = Date.now();
  
  // Store the logger in the request for use in route handlers
  req.logger = requestLogger;
  
  // Log the response when it's sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Determine log level based on status code
    if (statusCode >= 500) {
      requestLogger.error(`Response sent: ${statusCode} (${duration}ms)`);
    } else if (statusCode >= 400) {
      requestLogger.warn(`Response sent: ${statusCode} (${duration}ms)`);
    } else {
      requestLogger.http(`Response sent: ${statusCode} (${duration}ms)`);
    }
  });
  
  next();
};

export default requestLogger;
import rateLimit from 'express-rate-limit';
import logger from '../utils/logger.js';

/**
 * Configure rate limiting middleware
 * @param {Object} options - Rate limiting options
 * @returns {Function} Rate limiting middleware
 */
const setupRateLimit = (options = {}) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  logger.info('Setting up rate limiting middleware', {
    production: isProduction,
    ...options
  });
  
  const defaultOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production, more in development
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later.',
    skip: (req) => {
      // Skip rate limiting for certain paths or IPs if needed
      return false;
    },
  };
  
  return rateLimit({
    ...defaultOptions,
    ...options,
    handler: (req, res, next, options) => {
      const ip = req.ip || req.connection.remoteAddress;
      logger.warn('Rate limit exceeded', {
        ip,
        path: req.originalUrl,
        method: req.method
      });
      
      res.status(options.statusCode).json({
        error: {
          message: options.message,
          statusCode: options.statusCode,
        }
      });
    }
  });
};

export default setupRateLimit;
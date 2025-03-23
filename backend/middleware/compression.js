import compression from 'compression';
import logger from '../utils/logger.js';

/**
 * Configure compression middleware
 * @returns {Function} Compression middleware
 */
const setupCompression = () => {
  logger.info('Setting up compression middleware');
  
  return compression({
    // Filter function to determine which responses should be compressed
    filter: (req, res) => {
      // Don't compress responses with this request header
      if (req.headers['x-no-compression']) {
        return false;
      }
      
      // Use compression filter function
      return compression.filter(req, res);
    },
    // Compression level (0-9)
    level: 6,
  });
};

export default setupCompression;
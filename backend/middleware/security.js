import helmet from 'helmet';
import logger from '../utils/logger.js';

/**
 * Configure security middleware
 * @returns {Function} Helmet middleware
 */
const setupSecurity = () => {
  logger.info('Setting up security middleware');
  
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "https://api.example.com"], // Add your API domains here
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'same-origin' },
  });
};

export default setupSecurity;
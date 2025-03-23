import express from 'express';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Log route setup
logger.info('Setting up health check routes', { path: '/api/health' });

/**
 * Basic health check endpoint
 */
router.get('/', (req, res) => {
  req.logger.http('GET /api/health request received');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

/**
 * Detailed health check endpoint with database status
 */
router.get('/detailed', async (req, res) => {
  req.logger.http('GET /api/health/detailed request received');
  
  let dbStatus = 'unknown';
  let dbError = null;
  
  try {
    // Test database connection
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
    dbError = error.message;
    req.logger.error('Database health check failed', { error: error.message });
  }
  
  // Get memory usage
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: {
      status: dbStatus,
      error: dbError
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    }
  });
});

export default router;
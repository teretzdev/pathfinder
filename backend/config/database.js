import { Sequelize } from 'sequelize';
import logger from '../utils/logger.js';
import config from './index.js';

// Database connection parameters from config
const { host, port, name, user, password, dialect, logging, pool } = config.database;

// Initialize Sequelize instance
const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect,
  logging: logging ? (msg) => logger.debug(msg) : false,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle
  }
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.', {
      host,
      port,
      database: name,
      dialect
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', {
      error: error.message,
      stack: error.stack,
      host,
      port,
      database: name,
      dialect
    });
  }
})();

// Export the Sequelize instance
export default sequelize;
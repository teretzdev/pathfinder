import dotenv from 'dotenv';
import developmentConfig from './development.js';
import productionConfig from './production.js';

// Load environment variables from .env file
dotenv.config();

// Determine which configuration to use based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
const configs = {
  development: developmentConfig,
  production: productionConfig
};

// Get the configuration for the current environment
const config = configs[env] || developmentConfig;

// Export the configuration
export default config;
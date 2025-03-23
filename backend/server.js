import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import setupCompression from './middleware/compression.js';
import setupSecurity from './middleware/security.js';
import setupRateLimit from './middleware/rateLimit.js';
import AppError from './utils/AppError.js';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import config from './config/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application
const app = express();

// Get server configuration
const { port, host, cors: corsOptions } = config.server;
const isProduction = process.env.NODE_ENV === 'production';

// Apply security middleware
app.use(setupSecurity());

// Apply rate limiting (except for health checks)
app.use(/^(?!\/api\/health).*$/, setupRateLimit());

// Apply compression middleware
app.use(setupCompression());

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(requestLogger); // Log HTTP requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Serve static files from the React app in production
if (isProduction) {
  const distPath = path.resolve(__dirname, '..', 'dist');
  logger.info(`Serving static files from: ${distPath}`);
  
  app.use(express.static(distPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Basic route for development
  app.get('/', (req, res) => {
    req.logger.info('Home route accessed');
    res.send('Backend server is running!');
  });

  // Test route for different log levels (only in development)
  app.get('/api/test-logs', (req, res) => {
    const logger = req.logger.child({ component: 'LogTest' });
    
    logger.trace('This is a trace log');
    logger.debug('This is a debug log');
    logger.info('This is an info log');
    logger.warn('This is a warning log');
    logger.error('This is an error log');
    
    res.json({ message: 'Logs generated successfully. Check the console and log files.' });
  });

  // Test route for error handling
  app.get('/api/test-error', (req, res, next) => {
    try {
      // Simulate an error
      throw new AppError('This is a test error', 400);
    } catch (error) {
      next(error);
    }
  });

  // Route for uncaught errors
  app.get('/api/test-uncaught', (req, res) => {
    // This will trigger the error handler
    throw new Error('Uncaught error test');
  });
}

// 404 handler for undefined routes
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, host, () => {
  logger.info(`Server is running on http://${host}:${port}`, {
    component: 'Server',
    port,
    host,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.fatal('Uncaught exception', { error: error.message, stack: error.stack });
  // Give the logger time to write before exiting
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.fatal('Unhandled promise rejection', { reason, promise });
  // Give the logger time to write before exiting
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});
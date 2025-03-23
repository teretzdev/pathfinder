import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

// Create an Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(requestLogger); // Log HTTP requests

// Basic route
app.get('/', (req, res) => {
  req.logger.info('Home route accessed');
  res.send('Backend server is running!');
});

// Test route for different log levels
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

// 404 handler for undefined routes
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`, {
    component: 'Server',
    port: PORT,
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
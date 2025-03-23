import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';

// Create an Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use((req, res, next) => {
  const { method, url } = req;
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${method} ${url} ${res.statusCode} - ${duration}ms`);
  });
  next();
}); // Log HTTP requests using logger

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import connectionsRoutes from './routes/connections.js';
import diaryRoutes from './routes/diary.js';
import deviceRoutes from './routes/devices.js';
import deviceDataRoutes from './routes/deviceData.js';
import { Op } from 'sequelize';

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/device-data', deviceDataRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Pathfinder backend server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
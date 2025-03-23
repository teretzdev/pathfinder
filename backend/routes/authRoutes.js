import express from 'express';
import { register, login, validateToken } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Log route setup
logger.info('Setting up authentication routes', { path: '/api/auth' });

// Register route
router.post('/register', (req, res, next) => {
  req.logger.http('POST /api/auth/register request received');
  register(req, res, next);
});

// Login route
router.post('/login', (req, res, next) => {
  req.logger.http('POST /api/auth/login request received');
  login(req, res, next);
});

// Validate token route (protected)
router.get('/validate-token', authenticate, (req, res, next) => {
  req.logger.http('GET /api/auth/validate-token request received');
  validateToken(req, res, next);
});

export default router;
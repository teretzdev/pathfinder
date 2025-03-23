import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * Authentication middleware to protect routes
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
const authenticate = async (req, res, next) => {
  const logger = req.logger.child({ middleware: 'authenticate' });
  
  try {
    logger.debug('Authenticating request');
    
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authentication failed: No token provided');
      return next(new AppError('Authentication required', 401));
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      logger.warn('Authentication failed: Invalid token format');
      return next(new AppError('Authentication required', 401));
    }
    
    // Verify token
    logger.debug('Verifying JWT token');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      logger.warn('Authentication failed: Invalid token', { error: error.message });
      return next(new AppError('Invalid or expired token', 401));
    }
    
    // Find user
    logger.debug('Finding user from token', { userId: decoded.id });
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      logger.warn('Authentication failed: User not found', { userId: decoded.id });
      return next(new AppError('User not found', 401));
    }
    
    // Attach user to request
    req.user = user;
    logger.debug('User authenticated successfully', { userId: user.id, email: user.email });
    
    next();
  } catch (error) {
    logger.error('Error during authentication', { error: error.message, stack: error.stack });
    next(error);
  }
};

export default authenticate;
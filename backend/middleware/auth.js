import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

/**
 * Authentication Middleware
 * This middleware protects routes by verifying the JWT token provided in the request headers.
 */

// Environment variables
const { JWT_SECRET } = process.env;

/**
 * Middleware function to authenticate requests.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    logger.error('Error verifying token', {
      error: error.message,
      stack: error.stack,
      authHeader: authHeader || 'No Authorization header provided',
    });
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticate;
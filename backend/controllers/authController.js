import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

/**
 * Register a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
export const register = async (req, res, next) => {
  const logger = req.logger.child({ controller: 'AuthController', method: 'register' });
  
  try {
    logger.debug('Processing registration request');
    
    const { name, email, password, dateOfBirth } = req.body;
    
    // Check if user already exists
    logger.debug('Checking if user already exists', { email });
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      logger.warn('Registration failed: Email already in use', { email });
      return next(new AppError('Email already in use', 400));
    }
    
    // Hash password
    logger.debug('Hashing password');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    logger.debug('Creating new user', { name, email });
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth
    });
    
    // Generate JWT token
    logger.debug('Generating JWT token');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    logger.info('User registered successfully', { userId: user.id, email });
    
    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    logger.error('Error during user registration', { error: error.message, stack: error.stack });
    next(error);
  }
};

/**
 * Log in an existing user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
export const login = async (req, res, next) => {
  const logger = req.logger.child({ controller: 'AuthController', method: 'login' });
  
  try {
    logger.debug('Processing login request');
    
    const { email, password } = req.body;
    
    // Find user
    logger.debug('Finding user by email', { email });
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      logger.warn('Login failed: Invalid credentials', { email });
      return next(new AppError('Invalid credentials', 401));
    }
    
    // Verify password
    logger.debug('Verifying password');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      logger.warn('Login failed: Invalid credentials (password mismatch)', { email });
      return next(new AppError('Invalid credentials', 401));
    }
    
    // Generate JWT token
    logger.debug('Generating JWT token');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    logger.info('User logged in successfully', { userId: user.id, email });
    
    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    logger.error('Error during user login', { error: error.message, stack: error.stack });
    next(error);
  }
};

/**
 * Validate a JWT token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 */
export const validateToken = async (req, res, next) => {
  const logger = req.logger.child({ controller: 'AuthController', method: 'validateToken' });
  
  try {
    logger.debug('Processing token validation request');
    
    // The user object is attached by the auth middleware
    const { user } = req;
    
    logger.info('Token validated successfully', { userId: user.id });
    
    // Send response
    res.status(200).json({
      isValid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    logger.error('Error during token validation', { error: error.message, stack: error.stack });
    next(error);
  }
};
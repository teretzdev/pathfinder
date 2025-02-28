import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Environment variables
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Registration endpoint
router.post('/register', async (req, res) => {
  const { name, email, password, dateOfBirth } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    // Generate a token
    const token = generateToken(newUser.id);

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    logger.error('Error during registration:', { error });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a token
    const token = generateToken(user.id);

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    logger.error('Error during login:', { error });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Token validation endpoint
router.get('/validate-token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by ID
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    res.status(200).json({ message: 'Token is valid.', user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    logger.error('Error during token validation:', { error });
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});

export default router;
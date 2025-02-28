import express from 'express';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Fetch user profile
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'dateOfBirth'], // Select specific fields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error('Error fetching user profile', { error: error.message, id });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, dateOfBirth } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    logger.error('Error updating user profile', { error: error.message, id });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
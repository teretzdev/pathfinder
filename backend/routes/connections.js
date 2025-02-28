import express from 'express';
import Connection from '../models/Connection.js';
import User from '../models/User.js';

const router = express.Router();

// Fetch all connections for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const connections = await Connection.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'connectedUser',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (connections.length === 0) {
      return res.status(404).json({ message: 'No connections found for this user.' });
    }

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Create a new connection
router.post('/', async (req, res) => {
  const { userId, connectedUserId, sharedPatterns } = req.body;

  try {
    // Check if the connection already exists
    const existingConnection = await Connection.findOne({
      where: { userId, connectedUserId },
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists.' });
    }

    // Create a new connection
    const newConnection = await Connection.create({
      userId,
      connectedUserId,
      sharedPatterns,
    });

    res.status(201).json({ message: 'Connection created successfully.', connection: newConnection });
  } catch (error) {
    console.error('Error creating connection:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;

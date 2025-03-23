import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Device from '../models/Device.js';
import DeviceData from '../models/DeviceData.js';
import authenticate from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Middleware to authenticate device API requests
const authenticateDevice = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ message: 'API key is required.' });
  }

  try {
    const device = await Device.findOne({ where: { apiKey } });
    
    if (!device) {
      return res.status(401).json({ message: 'Invalid API key.' });
    }
    
    // Attach the device to the request object
    req.device = device;
    next();
  } catch (error) {
    logger.error('Error authenticating device', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Generate a secure API key
const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Register a new device (requires user authentication)
router.post('/register', authenticate, async (req, res) => {
  const { name, type, deviceId } = req.body;
  const userId = req.user.id;

  try {
    // Check if device ID already exists
    const existingDevice = await Device.findOne({ where: { deviceId } });
    if (existingDevice) {
      return res.status(400).json({ message: 'Device ID already registered.' });
    }

    // Generate a unique API key
    const apiKey = generateApiKey();

    // Create the new device
    const newDevice = await Device.create({
      deviceId,
      name,
      type,
      status: 'offline',
      apiKey,
      userId,
    });

    // Return the device info (excluding the API key for security)
    res.status(201).json({
      message: 'Device registered successfully.',
      device: {
        id: newDevice.id,
        deviceId: newDevice.deviceId,
        name: newDevice.name,
        type: newDevice.type,
        status: newDevice.status,
        apiKey, // Include API key only in the registration response
      },
    });
  } catch (error) {
    logger.error('Error registering device', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all devices for a user (requires user authentication)
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const devices = await Device.findAll({
      where: { userId },
      attributes: ['id', 'deviceId', 'name', 'type', 'status', 'lastConnected', 'createdAt', 'updatedAt'],
    });

    res.status(200).json(devices);
  } catch (error) {
    logger.error('Error fetching devices', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get a specific device by ID (requires user authentication)
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const device = await Device.findOne({
      where: { id, userId },
      attributes: ['id', 'deviceId', 'name', 'type', 'status', 'lastConnected', 'createdAt', 'updatedAt'],
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    res.status(200).json(device);
  } catch (error) {
    logger.error('Error fetching device', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update device information (requires user authentication)
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const userId = req.user.id;

  try {
    const device = await Device.findOne({ where: { id, userId } });

    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    // Update device details
    device.name = name || device.name;
    device.type = type || device.type;

    await device.save();

    res.status(200).json({
      message: 'Device updated successfully.',
      device: {
        id: device.id,
        deviceId: device.deviceId,
        name: device.name,
        type: device.type,
        status: device.status,
        lastConnected: device.lastConnected,
      },
    });
  } catch (error) {
    logger.error('Error updating device', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a device (requires user authentication)
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const device = await Device.findOne({ where: { id, userId } });

    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    await device.destroy();

    res.status(200).json({ message: 'Device deleted successfully.' });
  } catch (error) {
    logger.error('Error deleting device', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Regenerate API key for a device (requires user authentication)
router.post('/:id/regenerate-key', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const device = await Device.findOne({ where: { id, userId } });

    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    // Generate a new API key
    const newApiKey = generateApiKey();
    device.apiKey = newApiKey;

    await device.save();

    res.status(200).json({
      message: 'API key regenerated successfully.',
      apiKey: newApiKey,
    });
  } catch (error) {
    logger.error('Error regenerating API key', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Device check-in endpoint (requires device authentication)
router.post('/check-in', authenticateDevice, async (req, res) => {
  try {
    const device = req.device;
    
    // Update device status and last connected timestamp
    device.status = 'online';
    device.lastConnected = new Date();
    
    await device.save();
    
    res.status(200).json({ message: 'Check-in successful.' });
  } catch (error) {
    logger.error('Error during device check-in', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
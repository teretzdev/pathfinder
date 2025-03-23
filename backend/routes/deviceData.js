import express from 'express';
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

// Submit data from a device (requires device authentication)
router.post('/submit', authenticateDevice, async (req, res) => {
  const { dataType, value, latitude, longitude } = req.body;
  const device = req.device;

  try {
    // Create a new data entry
    const newData = await DeviceData.create({
      deviceId: device.id,
      dataType,
      value,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    // Update device's last connected timestamp
    device.lastConnected = new Date();
    device.status = 'online';
    await device.save();

    res.status(201).json({
      message: 'Data submitted successfully.',
      dataId: newData.id,
    });
  } catch (error) {
    logger.error('Error submitting device data', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Batch submit data from a device (requires device authentication)
router.post('/batch-submit', authenticateDevice, async (req, res) => {
  const { dataEntries } = req.body;
  const device = req.device;

  if (!Array.isArray(dataEntries) || dataEntries.length === 0) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array of data entries.' });
  }

  try {
    // Prepare data entries for bulk creation
    const preparedEntries = dataEntries.map(entry => ({
      deviceId: device.id,
      dataType: entry.dataType,
      value: entry.value,
      latitude: entry.latitude || null,
      longitude: entry.longitude || null,
      timestamp: entry.timestamp ? new Date(entry.timestamp) : new Date(),
    }));

    // Bulk create data entries
    await DeviceData.bulkCreate(preparedEntries);

    // Update device's last connected timestamp
    device.lastConnected = new Date();
    device.status = 'online';
    await device.save();

    res.status(201).json({
      message: 'Batch data submitted successfully.',
      count: dataEntries.length,
    });
  } catch (error) {
    logger.error('Error batch submitting device data', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get data for a specific device (requires user authentication)
router.get('/:deviceId', authenticate, async (req, res) => {
  const { deviceId } = req.params;
  const userId = req.user.id;
  const { dataType, startDate, endDate, limit = 100 } = req.query;

  try {
    // Verify the device belongs to the user
    const device = await Device.findOne({
      where: { id: deviceId, userId },
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found or unauthorized.' });
    }

    // Build query conditions
    const queryConditions = { deviceId: device.id };
    
    if (dataType) {
      queryConditions.dataType = dataType;
    }
    
    if (startDate && endDate) {
      queryConditions.timestamp = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      queryConditions.timestamp = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      queryConditions.timestamp = {
        [Op.lte]: new Date(endDate),
      };
    }

    // Fetch data
    const data = await DeviceData.findAll({
      where: queryConditions,
      order: [['timestamp', 'DESC']],
      limit: parseInt(limit, 10),
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error('Error fetching device data', { error: error.message });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Device from './Device.js';

// Define the DeviceData model
const DeviceData = sequelize.define('DeviceData', {
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'devices',
      key: 'id',
    },
    validate: {
      notEmpty: {
        msg: 'Device ID is required.',
      },
      isInt: {
        msg: 'Device ID must be an integer.',
      },
    },
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Data type is required.',
      },
    },
  },
  value: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'device_data',
  timestamps: true,
  indexes: [
    {
      fields: ['deviceId', 'timestamp'],
    },
    {
      fields: ['dataType'],
    },
  ],
});

// Define association with Device model
DeviceData.belongsTo(Device, { foreignKey: 'deviceId' });
Device.hasMany(DeviceData, { foreignKey: 'deviceId' });

export default DeviceData;
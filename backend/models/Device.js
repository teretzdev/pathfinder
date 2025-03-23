import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

// Define the Device model
const Device = sequelize.define('Device', {
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Device ID is required.',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Device name is required.',
      },
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Device type is required.',
      },
    },
  },
  status: {
    type: DataTypes.ENUM('online', 'offline', 'maintenance'),
    defaultValue: 'offline',
    allowNull: false,
  },
  lastConnected: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    validate: {
      notEmpty: {
        msg: 'User ID is required.',
      },
      isInt: {
        msg: 'User ID must be an integer.',
      },
    },
  },
}, {
  tableName: 'devices',
  timestamps: true,
});

// Define association with User model
Device.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Device, { foreignKey: 'userId' });

export default Device;
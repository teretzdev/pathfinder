# Pathfinder IoT Integration

Pathfinder now supports IoT device integration, allowing you to connect, manage, and collect data from various devices.

## Features

- **Device Management**: Register, update, and delete IoT devices
- **Secure Authentication**: Each device has its own API key for secure communication
- **Data Collection**: Collect and store data from your devices
- **Data Visualization**: View and analyze device data through the web interface
- **Real-time Updates**: Get real-time status updates from your devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pathfinder.git
   cd pathfinder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pathfinder
   DB_USER=postgres
   DB_PASSWORD=yourpassword

   # JWT Configuration
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. Initialize the database:
   ```
   npx sequelize-cli db:migrate
   ```

5. Start the application:
   ```
   npm start
   ```

## IoT Device Integration

### Registering a Device

1. Log in to your Pathfinder account
2. Navigate to the Device Management page
3. Click "Register New Device"
4. Fill in the device details:
   - Name: A friendly name for your device
   - Type: The type of device (e.g., "temperature sensor", "GPS tracker")
   - Device ID: A unique identifier for your device (e.g., serial number)
5. Save the API key that is generated - you'll need this for your device to authenticate

### Connecting Your Device

Your IoT device needs to:

1. Authenticate using the API key
2. Send regular check-ins to maintain its status
3. Submit data using the device data endpoints

See the example client in `examples/iot-client.js` for a demonstration of how to connect a device.

### API Endpoints for IoT Devices

All endpoints require the `x-api-key` header with your device's API key.

- `POST /api/devices/check-in`: Update the device's status to "online"
- `POST /api/device-data/submit`: Submit a single data point
- `POST /api/device-data/batch-submit`: Submit multiple data points at once

### Data Format

When submitting data, use the following format:

```json
{
  "dataType": "temperature",
  "value": 23.5,
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

For batch submissions:

```json
{
  "dataEntries": [
    {
      "dataType": "temperature",
      "value": 23.5,
      "timestamp": "2023-09-15T12:00:00Z",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    {
      "dataType": "humidity",
      "value": 45.2,
      "timestamp": "2023-09-15T12:00:00Z",
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  ]
}
```

## Security Considerations

- Keep your API keys secure
- Regenerate API keys if you suspect they've been compromised
- Use HTTPS in production environments
- Consider implementing rate limiting for production deployments

## Troubleshooting

If your device can't connect:

1. Verify the API key is correct
2. Check that the device is registered in the system
3. Ensure the server is running and accessible
4. Check network connectivity between the device and server

## License

This project is licensed under the MIT License - see the LICENSE file for details.
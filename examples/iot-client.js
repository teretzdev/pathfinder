/**
 * Example IoT Client for Pathfinder
 * 
 * This script demonstrates how to connect an IoT device to the Pathfinder backend.
 * It simulates a device that sends temperature, humidity, and location data.
 * 
 * Usage:
 * 1. Set the API_KEY and API_URL variables
 * 2. Run with Node.js: node iot-client.js
 */

const axios = require('axios');

// Configuration
const API_KEY = 'your-device-api-key'; // Replace with your actual API key
const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL
const DEVICE_CHECK_IN_INTERVAL = 60000; // 1 minute
const DATA_SEND_INTERVAL = 30000; // 30 seconds

// Headers for API requests
const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

// Function to simulate temperature readings
function getTemperature() {
  // Simulate temperature between 18°C and 28°C
  return parseFloat((Math.random() * 10 + 18).toFixed(1));
}

// Function to simulate humidity readings
function getHumidity() {
  // Simulate humidity between 30% and 70%
  return parseFloat((Math.random() * 40 + 30).toFixed(1));
}

// Function to simulate GPS coordinates (within a small area)
function getLocation() {
  // Base coordinates (example: San Francisco)
  const baseLat = 37.7749;
  const baseLng = -122.4194;
  
  // Add small random variation (approximately within 1km)
  const lat = baseLat + (Math.random() - 0.5) * 0.01;
  const lng = baseLng + (Math.random() - 0.5) * 0.01;
  
  return { latitude: lat, longitude: lng };
}

// Function to check in with the server
async function checkIn() {
  try {
    const response = await axios.post(`${API_URL}/devices/check-in`, {}, { headers });
    console.log('Check-in successful:', response.data.message);
  } catch (error) {
    console.error('Check-in failed:', error.response?.data?.message || error.message);
  }
}

// Function to send data to the server
async function sendData() {
  try {
    const temperature = getTemperature();
    const humidity = getHumidity();
    const location = getLocation();
    
    // Send temperature data
    await axios.post(`${API_URL}/device-data/submit`, {
      dataType: 'temperature',
      value: temperature,
      ...location,
    }, { headers });
    console.log(`Temperature data sent: ${temperature}°C`);
    
    // Send humidity data
    await axios.post(`${API_URL}/device-data/submit`, {
      dataType: 'humidity',
      value: humidity,
      ...location,
    }, { headers });
    console.log(`Humidity data sent: ${humidity}%`);
    
  } catch (error) {
    console.error('Failed to send data:', error.response?.data?.message || error.message);
  }
}

// Function to send batch data to the server
async function sendBatchData() {
  try {
    const dataEntries = [];
    
    // Generate 5 data points with timestamps spread over the last hour
    for (let i = 0; i < 5; i++) {
      const timestamp = new Date(Date.now() - i * 12 * 60000); // 12 minutes apart
      const location = getLocation();
      
      dataEntries.push({
        dataType: 'temperature',
        value: getTemperature(),
        timestamp: timestamp.toISOString(),
        ...location,
      });
      
      dataEntries.push({
        dataType: 'humidity',
        value: getHumidity(),
        timestamp: timestamp.toISOString(),
        ...location,
      });
    }
    
    await axios.post(`${API_URL}/device-data/batch-submit`, {
      dataEntries,
    }, { headers });
    
    console.log(`Batch data sent: ${dataEntries.length} entries`);
  } catch (error) {
    console.error('Failed to send batch data:', error.response?.data?.message || error.message);
  }
}

// Initial check-in
console.log('IoT client starting...');
checkIn();

// Schedule regular check-ins
setInterval(checkIn, DEVICE_CHECK_IN_INTERVAL);

// Schedule regular data sending
setInterval(sendData, DATA_SEND_INTERVAL);

// Send batch data once at startup (for demonstration)
setTimeout(sendBatchData, 5000);

console.log('IoT client running. Press Ctrl+C to stop.');
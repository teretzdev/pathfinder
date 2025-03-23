import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import deviceService from '../services/deviceService';
import { useNavigate } from 'react-router-dom';

interface Device {
  id: number;
  deviceId: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastConnected: string | null;
}

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: '',
    deviceId: '',
  });
  const [apiKey, setApiKey] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch devices on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const fetchedDevices = await deviceService.fetchDevices();
      setDevices(fetchedDevices);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await deviceService.registerDevice(newDevice);
      setApiKey(response.device.apiKey);
      setDevices((prev) => [...prev, response.device]);
      setNewDevice({ name: '', type: '', deviceId: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to register device');
    }
  };

  const handleDeleteDevice = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await deviceService.deleteDevice(id);
        setDevices((prev) => prev.filter(device => device.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete device');
      }
    }
  };

  const handleViewData = (id: number) => {
    navigate(`/device/${id}`);
  };

  const handleRegenerateApiKey = async (id: number) => {
    if (window.confirm('Are you sure you want to regenerate the API key? The old key will no longer work.')) {
      try {
        const response = await deviceService.regenerateApiKey(id);
        setApiKey(response.apiKey);
      } catch (err: any) {
        setError(err.message || 'Failed to regenerate API key');
      }
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Device Management</h1>
          <button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {showRegisterForm ? 'Cancel' : 'Register New Device'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded">
            {error}
          </div>
        )}

        {apiKey && (
          <div className="bg-green-600 p-4 rounded">
            <p className="font-bold">Device registered successfully!</p>
            <p>API Key: <span className="font-mono">{apiKey}</span></p>
            <p className="text-sm mt-2">
              Important: Save this API key as it will only be shown once. This key is required for your device to authenticate with the system.
            </p>
            <button
              onClick={() => setApiKey(null)}
              className="mt-2 bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {showRegisterForm && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Register New Device</h2>
            <form onSubmit={handleRegisterDevice} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Device Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDevice.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                  Device Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newDevice.type}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label htmlFor="deviceId" className="block text-sm font-medium text-gray-300">
                  Device ID
                </label>
                <input
                  type="text"
                  id="deviceId"
                  name="deviceId"
                  value={newDevice.deviceId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  A unique identifier for your device (e.g., serial number)
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Register Device
              </button>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-gray-700">Your Devices</h2>
          {loading ? (
            <div className="p-4 text-center">Loading devices...</div>
          ) : devices.length === 0 ? (
            <div className="p-4 text-center">
              No devices registered. Register your first device to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Connected
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{device.name}</div>
                        <div className="text-sm text-gray-400">{device.deviceId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {device.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            device.status === 'online'
                              ? 'bg-green-800 text-green-100'
                              : device.status === 'maintenance'
                              ? 'bg-yellow-800 text-yellow-100'
                              : 'bg-red-800 text-red-100'
                          }`}
                        >
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(device.lastConnected)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewData(device.id)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          View Data
                        </button>
                        <button
                          onClick={() => handleRegenerateApiKey(device.id)}
                          className="text-yellow-400 hover:text-yellow-300 mr-3"
                        >
                          New API Key
                        </button>
                        <button
                          onClick={() => handleDeleteDevice(device.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DeviceManagement;
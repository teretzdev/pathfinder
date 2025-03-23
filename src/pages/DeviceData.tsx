import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import deviceService from '../services/deviceService';

interface Device {
  id: number;
  deviceId: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastConnected: string | null;
}

interface DeviceData {
  id: number;
  deviceId: number;
  dataType: string;
  value: any;
  timestamp: string;
  latitude: number | null;
  longitude: number | null;
}

const DeviceData: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [data, setData] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    dataType: '',
    startDate: '',
    endDate: '',
    limit: 100,
  });

  useEffect(() => {
    if (id) {
      fetchDeviceAndData();
    }
  }, [id]);

  const fetchDeviceAndData = async () => {
    try {
      setLoading(true);
      const deviceId = parseInt(id as string, 10);
      
      // Fetch device details
      const deviceDetails = await deviceService.fetchDeviceById(deviceId);
      setDevice(deviceDetails);
      
      // Fetch device data
      const deviceData = await deviceService.fetchDeviceData(deviceId, filters);
      setData(deviceData);
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load device data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDeviceAndData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderValue = (value: any) => {
    if (typeof value === 'object') {
      return <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>;
    }
    return value;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        {loading && !device ? (
          <div className="text-center">Loading device information...</div>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded">{error}</div>
        ) : device ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{device.name}</h1>
              <span
                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  device.status === 'online'
                    ? 'bg-green-800 text-green-100'
                    : device.status === 'maintenance'
                    ? 'bg-yellow-800 text-yellow-100'
                    : 'bg-red-800 text-red-100'
                }`}
              >
                {device.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Device ID</h3>
                <p className="text-gray-300">{device.deviceId}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Type</h3>
                <p className="text-gray-300">{device.type}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Last Connected</h3>
                <p className="text-gray-300">
                  {device.lastConnected ? formatDate(device.lastConnected) : 'Never'}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Data Filters</h2>
              <form onSubmit={handleApplyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="dataType" className="block text-sm font-medium text-gray-300">
                    Data Type
                  </label>
                  <input
                    type="text"
                    id="dataType"
                    name="dataType"
                    value={filters.dataType}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="limit" className="block text-sm font-medium text-gray-300">
                    Limit
                  </label>
                  <select
                    id="limit"
                    name="limit"
                    value={filters.limit}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h2 className="text-xl font-semibold p-4 bg-gray-700">Device Data</h2>
              {loading ? (
                <div className="p-4 text-center">Loading data...</div>
              ) : data.length === 0 ? (
                <div className="p-4 text-center">No data available for this device.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(item.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {item.dataType}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {renderValue(item.value)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {item.latitude && item.longitude
                              ? `${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)}`
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">Device not found</div>
        )}
      </div>
    </Layout>
  );
};

export default DeviceData;
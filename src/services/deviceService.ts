import { get, post, put, del } from './api';

// Define types for devices
interface Device {
  id: number;
  deviceId: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastConnected: string | null;
  createdAt: string;
  updatedAt: string;
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

interface RegisterDeviceRequest {
  name: string;
  type: string;
  deviceId: string;
}

interface RegisterDeviceResponse {
  message: string;
  device: Device & { apiKey: string };
}

interface UpdateDeviceRequest {
  name?: string;
  type?: string;
}

interface UpdateDeviceResponse {
  message: string;
  device: Device;
}

interface RegenerateApiKeyResponse {
  message: string;
  apiKey: string;
}

// Device service
const deviceService = {
  /**
   * Register a new device
   * @param data - The data for the new device
   * @returns A promise resolving to the registration response
   */
  registerDevice: async (data: RegisterDeviceRequest): Promise<RegisterDeviceResponse> => {
    return await post<RegisterDeviceResponse>('/devices/register', data);
  },

  /**
   * Fetch all devices for the authenticated user
   * @returns A promise resolving to an array of devices
   */
  fetchDevices: async (): Promise<Device[]> => {
    return await get<Device[]>('/devices');
  },

  /**
   * Fetch a specific device by ID
   * @param deviceId - The ID of the device
   * @returns A promise resolving to the device
   */
  fetchDeviceById: async (deviceId: number): Promise<Device> => {
    return await get<Device>(`/devices/${deviceId}`);
  },

  /**
   * Update a device
   * @param deviceId - The ID of the device
   * @param data - The updated data for the device
   * @returns A promise resolving to the updated device
   */
  updateDevice: async (deviceId: number, data: UpdateDeviceRequest): Promise<UpdateDeviceResponse> => {
    return await put<UpdateDeviceResponse>(`/devices/${deviceId}`, data);
  },

  /**
   * Delete a device
   * @param deviceId - The ID of the device
   * @returns A promise resolving to a success message
   */
  deleteDevice: async (deviceId: number): Promise<{ message: string }> => {
    return await del<{ message: string }>(`/devices/${deviceId}`);
  },

  /**
   * Regenerate API key for a device
   * @param deviceId - The ID of the device
   * @returns A promise resolving to the new API key
   */
  regenerateApiKey: async (deviceId: number): Promise<RegenerateApiKeyResponse> => {
    return await post<RegenerateApiKeyResponse>(`/devices/${deviceId}/regenerate-key`, {});
  },

  /**
   * Fetch data for a specific device
   * @param deviceId - The ID of the device
   * @param params - Optional query parameters
   * @returns A promise resolving to an array of device data
   */
  fetchDeviceData: async (
    deviceId: number,
    params?: {
      dataType?: string;
      startDate?: string;
      endDate?: string;
      limit?: number;
    }
  ): Promise<DeviceData[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.dataType) {
      queryParams.append('dataType', params.dataType);
    }
    
    if (params?.startDate) {
      queryParams.append('startDate', params.startDate);
    }
    
    if (params?.endDate) {
      queryParams.append('endDate', params.endDate);
    }
    
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return await get<DeviceData[]>(`/device-data/${deviceId}${queryString}`);
  },
};

export default deviceService;
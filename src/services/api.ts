import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import frontendLogger from '../utils/logger';

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create a logger instance for API service
const apiLogger = frontendLogger.child({ service: 'API' });

// Generate a unique request ID
const generateRequestId = () => {
  return `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to log and enhance requests
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  // Generate a request ID for tracking
  const requestId = generateRequestId();
  
  // Add request ID to headers
  config.headers = {
    ...config.headers,
    'X-Request-ID': requestId
  };
  
  // Create a logger for this specific request
  const requestLogger = apiLogger.child({
    requestId,
    method: config.method?.toUpperCase(),
    url: config.url,
  });
  
  // Log the request (only in non-production)
  if (import.meta.env.VITE_APP_ENV !== 'production') {
    requestLogger.http('API Request', {
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
      headers: {
        ...config.headers,
        Authorization: config.headers?.Authorization ? '**REDACTED**' : undefined
      }
    });
  }
  
  // Store the logger and start time in the config for use in the response interceptor
  (config as any).metadata = {
    requestId,
    startTime: Date.now(),
    logger: requestLogger
  };
  
  return config;
});

// Interceptor to handle responses and log them
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as any;
    const { startTime, logger } = config.metadata || {};
    const duration = startTime ? Date.now() - startTime : undefined;
    
    // Log the successful response (only in non-production)
    if (import.meta.env.VITE_APP_ENV !== 'production') {
      logger?.http('API Response', {
        status: response.status,
        statusText: response.statusText,
        duration: duration ? `${duration}ms` : undefined,
        data: response.data
      });
    }
    
    return response;
  },
  (error) => {
    const config = error.config as any;
    const { startTime, logger } = config?.metadata || {};
    const duration = startTime ? Date.now() - startTime : undefined;
    
    // Log the error response
    if (error.response) {
      // Server responded with a status other than 2xx
      const { status, data } = error.response;
      
      logger?.error('API Error Response', {
        status,
        statusText: error.response.statusText,
        duration: duration ? `${duration}ms` : undefined,
        data,
        stack: error.stack
      });
      
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred while processing the request.',
      });
    } else if (error.request) {
      // Request was made but no response was received
      logger?.error('API No Response', {
        duration: duration ? `${duration}ms` : undefined,
        error: error.message,
        stack: error.stack
      });
      
      return Promise.reject({
        status: 0,
        message: 'No response received from the server. Please check your network connection.',
      });
    } else {
      // Something else happened while setting up the request
      logger?.error('API Request Setup Error', {
        error: error.message,
        stack: error.stack
      });
      
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred.',
      });
    }
  }
);

// Helper methods for HTTP requests
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

// Export the Axios instance for direct use if needed
export default apiClient;
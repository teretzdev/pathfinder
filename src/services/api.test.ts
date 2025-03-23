import axios from 'axios';
import { get, post, put, del } from './api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get function', () => {
    test('should call axios.get with correct parameters', async () => {
      const mockResponse = { data: { id: 1, name: 'Test' } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await get('/test');

      expect(mockedAxios.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('post function', () => {
    test('should call axios.post with correct parameters', async () => {
      const mockData = { name: 'Test' };
      const mockResponse = { data: { id: 1, name: 'Test' } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await post('/test', mockData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/test', mockData, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('put function', () => {
    test('should call axios.put with correct parameters', async () => {
      const mockData = { id: 1, name: 'Updated Test' };
      const mockResponse = { data: { id: 1, name: 'Updated Test' } };
      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      const result = await put('/test/1', mockData);

      expect(mockedAxios.put).toHaveBeenCalledWith('/test/1', mockData, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('del function', () => {
    test('should call axios.delete with correct parameters', async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      const result = await del('/test/1');

      expect(mockedAxios.delete).toHaveBeenCalledWith('/test/1', undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
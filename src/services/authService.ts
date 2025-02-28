import { get, post } from './api';
import frontendLogger from '../utils/logger';

// Define the types for the authentication service
interface LoginResponse {
  token: string;
  message: string;
}

interface RegisterResponse {
  token: string;
  message: string;
}

interface ValidateTokenResponse {
  isValid: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// Authentication service
const authService = {
  /**
   * Register a new user
   * @param name - User's name
   * @param email - User's email
   * @param password - User's password
   * @param dateOfBirth - User's date of birth
   * @returns A promise resolving to the registration response
   */
  register: async (
    name: string,
    email: string,
    password: string,
    dateOfBirth: string
  ): Promise<RegisterResponse> => {
    const data = { name, email, password, dateOfBirth };
    frontendLogger.info('Registering user', { name, email });
    try {
      const response = await post<RegisterResponse>('/auth/register', data);
      frontendLogger.info('User registered successfully', { email });
      return response;
    } catch (error) {
      frontendLogger.error('Error during user registration', { email, error });
      throw error;
    }
  },

  /**
   * Log in an existing user
   * @param email - User's email
   * @param password - User's password
   * @returns A promise resolving to the login response
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };
    frontendLogger.info('Logging in user', { email });
    try {
      const response = await post<LoginResponse>('/auth/login', data);
      frontendLogger.info('User logged in successfully', { email });
      return response;
    } catch (error) {
      frontendLogger.error('Error during user login', { email, error });
      throw error;
    }
  },

  /**
   * Validate a JWT token
   * @param token - The JWT token to validate
   * @returns A promise resolving to the token validation response
   */
  validateToken: async (token: string): Promise<ValidateTokenResponse> => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    frontendLogger.info('Validating token');
    try {
      const response = await get<ValidateTokenResponse>('/auth/validate-token', config);
      frontendLogger.info('Token validated successfully');
      return response;
    } catch (error) {
      frontendLogger.error('Error during token validation', { error });
      throw error;
    }
  },
};

export default authService;
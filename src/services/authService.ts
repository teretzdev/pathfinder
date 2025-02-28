import { get, post } from './api';

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
    return await post<RegisterResponse>('/auth/register', data);
  },

  /**
   * Log in an existing user
   * @param email - User's email
   * @param password - User's password
   * @returns A promise resolving to the login response
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };
    return await post<LoginResponse>('/auth/login', data);
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
    return await get<ValidateTokenResponse>('/auth/validate-token', config);
  },
};

export default authService;

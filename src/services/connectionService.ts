import { get, post } from './api';
import frontendLogger from '../utils/logger';

// Define types for connections
interface Connection {
  id: number;
  userId: number;
  connectedUserId: number;
  sharedPatterns: string[];
}

interface CreateConnectionRequest {
  userId: number;
  connectedUserId: number;
  sharedPatterns?: string[];
}

interface CreateConnectionResponse {
  message: string;
  connection: Connection;
}

// Connection service
const connectionService = {
  /**
   * Fetch all connections for a user
   * @param userId - The ID of the user
   * @returns A promise resolving to an array of connections
   */
  fetchConnections: async (userId: number): Promise<Connection[]> => {
    frontendLogger.info(`Fetching connections for userId: ${userId}`);
    try {
      const connections = await get<Connection[]>(`/connections/${userId}`);
      frontendLogger.info(`Successfully fetched ${connections.length} connections for userId: ${userId}`);
      return connections;
    } catch (error) {
      frontendLogger.error(`Error fetching connections for userId: ${userId}`, { error });
      throw error;
    }
  },

  /**
   * Create a new connection
   * @param data - The data for the new connection
   * @returns A promise resolving to the created connection
   */
  createConnection: async (
    data: CreateConnectionRequest
  ): Promise<CreateConnectionResponse> => {
    frontendLogger.info(`Creating a new connection for userId: ${data.userId} with connectedUserId: ${data.connectedUserId}`);
    try {
      const response = await post<CreateConnectionResponse>('/connections', data);
      frontendLogger.info(`Successfully created a connection with ID: ${response.connection.id}`);
      return response;
    } catch (error) {
      frontendLogger.error(`Error creating connection for userId: ${data.userId} with connectedUserId: ${data.connectedUserId}`, { error });
      throw error;
    }
  },
};

export default connectionService;
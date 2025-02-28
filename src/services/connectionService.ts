import { get, post } from './api';

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
    return await get<Connection[]>(`/connections/${userId}`);
  },

  /**
   * Create a new connection
   * @param data - The data for the new connection
   * @returns A promise resolving to the created connection
   */
  createConnection: async (
    data: CreateConnectionRequest
  ): Promise<CreateConnectionResponse> => {
    return await post<CreateConnectionResponse>('/connections', data);
  },
};

export default connectionService;

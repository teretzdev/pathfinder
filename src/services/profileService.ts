import { get, put } from './api';
import frontendLogger from '../utils/logger';

// Define the types for the profile service
interface UserProfile {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
}

interface UpdateProfileRequest {
  name?: string;
  email?: string;
  dateOfBirth?: string;
}

interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
}

// Profile service
const profileService = {
  /**
   * Fetch the user profile by ID
   * @param userId - The ID of the user
   * @returns A promise resolving to the user profile
   */
  fetchProfile: async (userId: number): Promise<UserProfile> => {
    frontendLogger.info(`Fetching profile for user ID: ${userId}`);
    try {
      const profile = await get<UserProfile>(`/profile/${userId}`);
      frontendLogger.info(`Successfully fetched profile for user ID: ${userId}`);
      return profile;
    } catch (error) {
      frontendLogger.error(`Error fetching profile for user ID: ${userId}`, { error });
      throw error;
    }
  },

  /**
   * Update the user profile
   * @param userId - The ID of the user
   * @param data - The profile data to update
   * @returns A promise resolving to the update response
   */
  updateProfile: async (
    userId: number,
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> => {
    frontendLogger.info(`Updating profile for user ID: ${userId}`, { data });
    try {
      const response = await put<UpdateProfileResponse>(`/profile/${userId}`, data);
      frontendLogger.info(`Successfully updated profile for user ID: ${userId}`);
      return response;
    } catch (error) {
      frontendLogger.error(`Error updating profile for user ID: ${userId}`, { error });
      throw error;
    }
  },
};

export default profileService;
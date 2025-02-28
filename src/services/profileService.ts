import { get, put } from './api';

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
    return await get<UserProfile>(`/profile/${userId}`);
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
    return await put<UpdateProfileResponse>(`/profile/${userId}`, data);
  },
};

export default profileService;

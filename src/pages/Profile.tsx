import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import profileService from '../services/profileService';

interface ProfileData {
  name: string;
  email: string;
  dateOfBirth: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Astrology enthusiast and lifelong learner.',
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.bio) newErrors.bio = 'Bio is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.fetchProfile(1); // Replace 1 with the actual user ID
        setFormData(data);
      } catch (error: any) {
        setFetchError(error.message || 'An error occurred while fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const updatedData = await profileService.updateProfile(1, formData); // Replace 1 with the actual user ID
        setFormData(updatedData.user);
        alert('Profile updated successfully!');
      } catch (error: any) {
        alert(error.message || 'An error occurred while updating the profile.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Your Profile</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading profile...</p>
        ) : fetchError ? (
          <p className="text-center text-red-500">{fetchError}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-white">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
              />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
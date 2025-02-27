import React, { useState } from 'react';
import Layout from '../components/Layout';

interface ProfileData {
  name: string;
  email: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Astrology enthusiast and lifelong learner.',
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Profile updated:', formData);
      // Add logic to handle profile update, e.g., API call
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Your Profile</h1>

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
      </div>
    </Layout>
  );
};

export default Profile;

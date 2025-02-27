import React, { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate an API call to fetch user profile data
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (err: any) {
        if (err.message === 'Failed to fetch') {
          setError('Unable to connect to the server. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please refresh the page.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">User Profile</h2>

      {loading && <p className="text-gray-300">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {profile && (
        <div className="text-gray-300 space-y-4">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
```

### Step 4: Review the Code
1. **Component Setup**: The `Profile` component is implemented as a functional React component.
2. **State Management**: `useState` is used to manage `profile`, `error`, and `loading` states. `useEffect` is used to fetch data on component mount.
3. **Error Handling**:
   - Network errors are caught and display a specific message: "Unable to connect to the server. Please try again later."
   - Unexpected errors display a generic message: "An unexpected error occurred. Please refresh the page."
4. **Styling**: Tailwind CSS is used for styling, consistent with the dark theme (`bg-gray-800`, `text-gray-300`, `text-red-500`, etc.).
5. **Functionality**: The component fetches user profile data, handles errors, and displays the data or error messages appropriately.
6. **Conventions**: The implementation follows the conventions of the codebase, including functional components, TypeScript for type safety, and Tailwind CSS for styling.
7. **Completeness**: The file is fully functional and does not contain placeholders or TODOs.

### Final Output
```
import React, { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate an API call to fetch user profile data
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (err: any) {
        if (err.message === 'Failed to fetch') {
          setError('Unable to connect to the server. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please refresh the page.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">User Profile</h2>

      {loading && <p className="text-gray-300">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {profile && (
        <div className="text-gray-300 space-y-4">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;

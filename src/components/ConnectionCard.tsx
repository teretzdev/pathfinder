import React from 'react';

interface ConnectionCardProps {
  name: string;
  sharedPatterns: string[];
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ name, sharedPatterns }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-white">{name}</h2>
      <p className="text-gray-300">Shared Patterns:</p>
      {sharedPatterns.length > 0 ? (
        <ul className="list-disc list-inside text-gray-400">
          {sharedPatterns.map((pattern, index) => (
            <li key={index}>{pattern}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No shared patterns available.</p>
      )}
    </div>
  );
};

export default ConnectionCard;
```

### Step 4: Review the Code
1. **Props**: The `ConnectionCard` component accepts `name` and `sharedPatterns` as props, which are typed using TypeScript.
2. **Styling**: Tailwind CSS classes are used to ensure a consistent dark theme aesthetic (`bg-gray-800`, `text-white`, `text-gray-300`, etc.).
3. **Functionality**: The component dynamically renders the connection's name and a list of shared patterns. If no patterns are available, a fallback message is displayed.
4. **Conventions**: The implementation follows the conventions of the codebase, including functional components, TypeScript for type safety, and Tailwind CSS for styling.
5. **Completeness**: The component is fully functional and ready to be used in the application.

### Final Output
```
import React from 'react';

interface ConnectionCardProps {
  name: string;
  sharedPatterns: string[];
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ name, sharedPatterns }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      {/* Connection Name */}
      <h2 className="text-2xl font-semibold text-white">{name}</h2>

      {/* Shared Patterns */}
      <p className="text-gray-300">Shared Patterns:</p>
      {sharedPatterns.length > 0 ? (
        <ul className="list-disc list-inside text-gray-400">
          {sharedPatterns.map((pattern, index) => (
            <li key={index}>{pattern}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No shared patterns available.</p>
      )}
    </div>
  );
};

export default ConnectionCard;
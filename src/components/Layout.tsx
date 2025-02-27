import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white" lang="en">
      <header className="p-4 bg-gray-800 shadow-md" aria-label="Main Header">
        <h1 className="text-2xl font-bold">Pathfinder</h1>
      </header>
      <section className="p-6 container mx-auto">{children}</section>
      <footer className="p-4 bg-gray-800 text-center" aria-label="Footer">
        <p>&copy; 2023 Pathfinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
```

### Step 4: Review the Code
1. **Header**: The header includes the application name "Pathfinder" styled with Tailwind CSS classes (`p-4`, `bg-gray-800`, `shadow-md`, `text-2xl`, `font-bold`).
2. **Dark Theme**: The `div` wrapping the component uses `bg-gray-900` for the background and `text-white` for text color, consistent with the dark theme.
3. **Children Prop**: The `children` prop is used to allow dynamic content insertion into the `main` section.
4. **Footer**: The footer matches the dark theme aesthetic and includes copyright information.
5. **Conventions**: The file uses React functional components, TypeScript for type safety, and Tailwind CSS for styling, consistent with the codebase.

### Final Output
```
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">Pathfinder</h1>
      </header>
      <main className="p-6">{children}</main>
      <footer className="p-4 bg-gray-800 text-center">
        <p>&copy; 2023 Pathfinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
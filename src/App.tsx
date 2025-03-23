import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Diary from './pages/Diary';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  // This is a simple placeholder for authentication state
  // In a real app, you would use a proper auth context or state management
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/diary" 
          element={isAuthenticated ? <Diary /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
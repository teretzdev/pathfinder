import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Diary from './pages/Diary';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLoginSuccess={handleLogin} />
        } />
        <Route path="/register" element={
          isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Register onRegisterSuccess={handleLogin} />
        } />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/diary" 
          element={isAuthenticated ? <Diary /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Diary from './pages/Diary';
import Login from './pages/Login';
import Register from './pages/Register';
import DevTools from './pages/DevTools';
import Navbar from './components/Navbar';
import { LoggerProvider } from './utils/useLogger';
import frontendLogger from './utils/logger';

const App: React.FC = () => {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for token on initial load
  useEffect(() => {
    frontendLogger.info('App initializing', { timestamp: new Date().toISOString() });
    const token = localStorage.getItem('token');
    if (token) {
      frontendLogger.info('User token found, setting authenticated state');
      setIsAuthenticated(true);
    } else {
      frontendLogger.info('No user token found');
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    frontendLogger.info('User logged in successfully');
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    frontendLogger.info('User logged out');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <LoggerProvider context={{ appVersion: '1.0.0' }}>
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
          <Route 
            path="/dev-tools" 
            element={isAuthenticated ? <DevTools /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </LoggerProvider>
  );
};

export default App;
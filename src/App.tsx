import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connections from './pages/Connections';
import DeviceManagement from './pages/DeviceManagement';
import DeviceData from './pages/DeviceData';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connections />} />
        <Route path="/devices" element={<DeviceManagement />} />
        <Route path="/device/:id" element={<DeviceData />} />
      </Routes>
    </Router>
  );
};

export default App;
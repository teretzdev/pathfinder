import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initLogStorage } from './utils/logExporter';
import frontendLogger from './utils/logger';

// Initialize log storage
initLogStorage();

frontendLogger.info('Application starting', {
  version: '1.0.0',
  environment: import.meta.env.MODE,
  timestamp: new Date().toISOString()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
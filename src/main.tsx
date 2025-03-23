import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initLogStorage } from './utils/logExporter';
import frontendLogger from './utils/logger';
import * as serviceWorker from './serviceWorker';
import { initPerformanceMonitoring } from './utils/performance';

// Initialize log storage
initLogStorage();

// Initialize performance monitoring
initPerformanceMonitoring();

frontendLogger.info('Application starting', {
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENV,
  timestamp: new Date().toISOString()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (import.meta.env.VITE_APP_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
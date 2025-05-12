
import "regenerator-runtime/runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize any required polyfills or global variables
// This is where we would typically set up environment variables in the window object
// if they're not available through import.meta.env in Vite

// For development environment
if (import.meta.env.DEV) {
  // Set up any development-specific configuration
  console.log('Running in development mode');
  
  // Example: Add environment variables to window for development
  (window as any).env = {
    REACT_APP_VIDEO_STORAGE_PATH: 'interview_recordings_dev'
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Import the React library
import React from 'react';
// Import the ReactDOM library for rendering the application
import ReactDOM from 'react-dom/client';
// Import the main App component
import App from './App.jsx';
// Import global CSS styles
import './index.css';
// Import BrowserRouter component for routing
import { BrowserRouter } from 'react-router-dom';
// Import SnackbarProvider for displaying notifications
import { SnackbarProvider } from 'notistack'; // Import to apply notifications

// Render the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
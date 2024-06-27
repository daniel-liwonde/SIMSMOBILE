import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { StatusBar } from '@capacitor/status-bar';
import App from './App';

// Function to initialize Capacitor plugins
const initCapacitor = async () => {
  const { StatusBar } = await import('@capacitor/status-bar');
  StatusBar.setBackgroundColor({ color: '#154360' });
};

// Call the element loader before the render call
defineCustomElements(window);
// Create root and render the app
const container = document.getElementById('root');
const root = createRoot(container!);

// Initialize Capacitor plugins and render the app
initCapacitor().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

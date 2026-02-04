
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeConfig';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Registering from the absolute root as configured in vercel.json
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('Service Worker registered with scope: ', registration.scope);
    }).catch(err => {
      console.log('SW registration failed: ', err);
    });
  });
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { SkeletonTheme } from 'react-loading-skeleton';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#F7F7F7" highlightColor="#525252">
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SkeletonTheme>
  </React.StrictMode>
);

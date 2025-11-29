import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from '@routes/index';
import { ThemeProvider } from "./ThemeContext";
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>
);

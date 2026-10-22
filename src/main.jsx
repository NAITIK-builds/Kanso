import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RentalProvider } from './context/RentalContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RentalProvider>
        <App />
      </RentalProvider>
    </BrowserRouter>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { KansoProvider } from './context/KansoContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <KansoProvider>
        <App />
      </KansoProvider>
    </BrowserRouter>
  </React.StrictMode>
);


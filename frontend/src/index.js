import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import StorecontextProvider from './Components/Context/storecontext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StorecontextProvider>
    <App />
  </StorecontextProvider>,
  </React.StrictMode>
);

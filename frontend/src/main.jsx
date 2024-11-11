import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context";
import { Provider } from 'react-redux';
import { store, persistor } from './store/storeConfig'; // Import store and persistor
import { PersistGate } from 'redux-persist/integration/react';
// PersistGate ensures that your app waits for Redux Persist to load the stored state before rendering, 
// avoiding potential issues with missing data on page reload.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap with Provider and pass the store */}
      <PersistGate loading={null} persistor={persistor}> {/* PersistGate to delay rendering until state is rehydrated */}
        <BrowserRouter>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);


// The loading prop can accept any fallback component to display 
// while the state is being rehydrated (e.g., a loading spinner), or null to display nothing during that time.
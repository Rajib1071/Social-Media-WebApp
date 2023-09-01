import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useAppContext, AppProvider } from './AppContext'; // Import the AppProvider


const root = createRoot(document.getElementById('root'));
root.render(<AppProvider>
    <App />
</AppProvider>);

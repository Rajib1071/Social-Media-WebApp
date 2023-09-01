import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { useAppContext, AppProvider } from './AppContext'; // Import the AppProvider

const App = () => {
  
  return (
    <Router>
      <AppProvider> {/* Wrap your app with the AppProvider */}
      
        <Routes>
          {/* Placeholder routes until you create the Login and Register components */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/" element={<Home />} />

          {/* Add more routes for other components */}
        </Routes>
      </AppProvider> {/* Close the AppProvider */}
    </Router>
  );
};

export default App;

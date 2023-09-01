import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { useAppContext, AppProvider } from './AppContext'; // Import the AppProvider
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { state: { currentUser } } = useAppContext();
  const navigate = useNavigate();
  return (
    <Router>
      <AppProvider> {/* Wrap your app with the AppProvider */}
      
        <Routes>
          {/* Placeholder routes until you create the Login and Register components */}
          <Route path="/login" element={currentUser ? navigate('/') : <Login />} />
          <Route path="/register" element={currentUser ? navigate('/') : <Register />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/" element={currentUser ? <Home /> : navigate('/login')} />

          {/* Add more routes for other components */}
        </Routes>
      </AppProvider> {/* Close the AppProvider */}
    </Router>
  );
};

export default App;

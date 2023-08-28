import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Placeholder routes until you create the Login and Register components */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
       
        {/* Add more routes for other components */}
      </Routes>
    </Router>
  );
};

export default App;

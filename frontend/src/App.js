import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Placeholder routes until you create the Login and Register components */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
       
        {/* Add more routes for other components */}
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import ChatPage from './pages/ChatPage/ChatPage';
import { useAppContext } from './AppContext';


function Root() {
  const { state: { currentUser } } = useAppContext();

  return (
    <div>
      <Routes>
        {/* Placeholder routes until you create the Login and Register components */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/messages" element={currentUser ? <ChatPage /> : <Navigate replace to="/login" /> }/>
        <Route path="/login" element={currentUser ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate replace to="/" /> : <Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/profile/:profileId" element={currentUser ? <Profile /> : <Navigate replace to="/login" />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={currentUser ? <Home /> : <Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}
const App = () => {
  return (
    <Router>
      <Root />
    </Router>
  );
};

export default App;

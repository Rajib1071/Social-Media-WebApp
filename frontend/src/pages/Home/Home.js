import React from 'react';
import { Link } from 'react-router-dom';
import './homeStyles.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to My Social Media App</h2>
      <p>Please choose an option:</p>
      <Link to="/login" className="home-option">
        Login
      </Link>
      <Link to="/register" className="home-option">
        Register
      </Link>
    </div>
  );
};

export default Home;

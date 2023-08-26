import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/authStyles.css'; // Import the CSS file

const Home = () => {
  return (
    <div>
      <h2>Welcome to My Social Media App</h2>
      <p>Please choose an option:</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;

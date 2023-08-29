import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login clicked:', email, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className="login-options">
        <a href="#forgot">Forgot Password?</a>
        <span className="divider">|</span>
        <Link to="/register">New User? Register Now</Link> {/* Use Link component */}
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registerStyles.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
const Register = () => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add your registration logic here
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('User registered successfully:', response.data);
        // Redirect to login page or show a success message
        toast.success('User registered successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, display a message, etc.
      toast.error('Error registering user', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <ToastContainer /> {/* Place the ToastContainer here */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      <div className="register-options">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './loginStyles.css';
import axios from 'axios';
import { useAppContext, SET_CURRENT_USER  } from '../../AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const { dispatch} = useAppContext(); // Get the dispatch function from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate(); // Get the history object
  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    // console.log('Login clicked:', email, password);
     try {
      const response = await axios.post('http://localhost:3001/api/users/login', {

        email,
        password,
      });
      if (response.status === 200) {
        
        const userData = response.data;
        // Dispatch the user object to the context
        dispatch({ type: SET_CURRENT_USER, payload: userData });
        // console.log('User data dispatched:', userData); // Add this line
        // Clear any previous error messages
        // setError('');
        // Redirect or handle as needed
        console.log('User log in successfully');
        // Redirect to login page or show a success message
        // toast.success('User Log in successfull', {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 3000,
        // });
        // setTimeout(() => {
        //   navigate('/home');
        // }, 3000);
        // Redirect to the home page
        // history.push('/');
        // 
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, display a message, etc.
      toast.error('Error in User Log in', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer /> {/* Place the ToastContainer here */}
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

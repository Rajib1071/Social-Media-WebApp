import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform basic form validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Perform login logic (e.g., make API request to backend)
    // Replace this with your actual login implementation
    login(username, password);
  };

  const login = (username, password) => {
    // Simulate API request to backend
    setTimeout(() => {
      // Check if the login is successful (e.g., username and password match)
      if (username === 'test' && password === 'password') {
        // Perform successful login action (e.g., update state, navigate to the main app)
        console.log('Login successful');
      } else {
        // Handle login error (e.g., display error message)
        setError('Invalid username or password');
      }
    }, 1000);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

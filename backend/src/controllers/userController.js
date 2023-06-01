const User = require('../models/User.js');

// Controller function for registering a user
async function registerUser(req, res) {
  // Get the user data from the request body
  const { username, email, password } = req.body;

  try {

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    // Create a new user using the User model
    const newUser = new User({ username, email, password });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return the saved user as the response
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to register user' });
  }
}

// Controller function for logging in a user
async function loginUser(req, res) {
  // Get the user data from the request body
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && user.comparePassword(password)) {
      // Return the user as the response
      res.json(user);
    } else {
      // Return an error response if the user doesn't exist or the password is incorrect
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to log in' });
  }
}

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
};

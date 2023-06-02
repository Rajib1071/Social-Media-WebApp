const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// Route for following/unfollowing a user
router.post('/follow', userController.followUser);


module.exports = router;

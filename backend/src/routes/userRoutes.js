const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileUpload'); // Adjust the path based on your project structure
const userController = require('../controllers/userController');

// Define the routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// Route for following/unfollowing a user
router.post('/follow', userController.followUser);

// Update user profile
router.put('/profile', upload.single('profilePhoto'), userController.updateProfile);
// router.put('/profile/:username', upload.single('profilePhoto'), userController.updateProfile);

module.exports = router;

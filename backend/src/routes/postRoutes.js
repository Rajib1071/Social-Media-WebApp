const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileUpload'); // Adjust the path based on your project structure
const postController = require('../controllers/postController');

// Define the routes
// Delete a post
router.delete('/', postController.deletePost);

// Create a new post
// router.post('/', postController.createPost);
// Use the upload middleware in the post route
router.post('/', upload.single('image'), postController.createPost);

// Get all posts for a user
router.get('/', postController.getAllPosts);


// Route for editing a post
router.put('/', postController.editPost);

// Route to get the posts of the users being followed
router.get('/followed', postController.getFollowedPosts);

// Export the router
module.exports = router;

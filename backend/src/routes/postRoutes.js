const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileUpload'); // Adjust the path based on your project structure
const postController = require('../controllers/postController');

// Define the routes
// Define the routes
router.delete('/', postController.deletePost);
router.post('/', upload.single('image'), postController.createPost);
router.get('/user/:userId', postController.getAllPosts); // Use a different pattern here
router.post('/like', postController.likePost);
router.put('/', postController.editPost);
router.get('/followed-posts', postController.getFollowedPosts); // Use a different pattern here

// Route to get both followed and own posts
router.get('/user-followers/:userId', postController.getFollowedAndOwnPosts);


// Export the router
module.exports = router;

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
// Define the routes
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);

// Export the router
module.exports = router;

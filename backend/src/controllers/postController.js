const Post = require('../models/Post');
const User = require('../models/User');
// Controller function for creating a new post
async function createPost(req, res) {
    // Get the post data from the request body
    const { title, content, userId } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create a new post using the Post model
      const newPost = new Post({ title, content, user: userId });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      // Add the post to the user's posts array
      user.posts.push(savedPost._id);
      await user.save();
  
      // Return the saved post as the response
      res.status(201).json(savedPost);
    } catch (error) {
      // Handle any errors and send an error response
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
  
  // Controller function for getting all posts
  async function getAllPosts(req, res) {
    try {
      // Retrieve all posts from the database
      const posts = await Post.find().populate('user', 'username');
  
      // Return the posts as the response
      res.json(posts);
    } catch (error) {
      // Handle any errors and send an error response
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  }
  
  // Export the controller functions
  module.exports = {
    createPost,
    getAllPosts,
  };
  
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');
const Jimp = require('jimp');


// Controller function for deleting a post
async function deletePost(req, res) {

  const { postId, userId } = req.body;

  try {
    // Find the post by its ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post from the database
    await Post.deleteOne({ _id: postId });
    // Remove the post ID from the user's posts array
    const user = await User.findById(userId);
    user.posts.pull(postId);
    await user.save();

    // Return a success message
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: `Failed to delete post: ${error.message}` });
  }
}

// Controller function for creating a new post
async function createPost(req, res) {
  // Get the post data from the request body
  const { title, content, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      console.log(userId)
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read the image file content
    const imageBuffer = fs.readFileSync(req.file.path);


    //manual checking of img
    // Jimp.read(imageBuffer, (err, image) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   // Save the image as a JPG file
    //   image.write('output.jpg', (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }

    //     console.log('Image saved as output.jpg');
    //   });
    // });

    // Create a new post using the Post model
    const newPost = new Post({ title, content, author: userId, image: { data: imageBuffer, contentType: req.file.mimetype } });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Add the post to the user's posts array
    user.posts.push(savedPost._id);
    await user.save();

    // Delete the temporary file
    fs.unlinkSync(req.file.path);

    // Return the saved post as the response
    res.status(201).json(savedPost);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to create post' });
  }
}

// Controller function for getting all posts 
async function getAllPosts(req, res) {
  const { userId } = req.body;

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId).populate('posts');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve all posts from the user's posts array
    const posts = user.posts;




    // Return the posts as the response
    res.json(posts);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
}

// // Controller function for getting all posts
// async function getAllPosts(req, res) {
//   const { userId } = req.body;

//   try {
//     // Retrieve the user from the database
//     const user = await User.findById(userId).populate('posts');

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Retrieve all posts from the user's posts array
//     const posts = user.posts;

//     // Process each post to convert image buffer to base64 string (if image exists)
//     const processedPosts = posts.map((post) => {
//       // Check if an image exists for the post
//       if (post.image && post.image.data) {
//         // Read the image buffer
//         const imageBuffer = post.image.data;
//         Jimp.read(imageBuffer, (err, image) => {
//           if (err) {
//             console.error(err);
//             return;
//           }

//           // Save the image as a JPG file
//           image.write('output.jpg', (err) => {
//             if (err) {
//               console.error(err);
//               return;
//             }

//             console.log('Image saved as output.jpg');
//           });
//         });
//       }

//       // If no image exists, return the post object as is
//       return post.toObject();
//     });

//     // Return the processed posts as the response
//     res.json(processedPosts);
//   } catch (error) {
//     // Handle any errors and send an error response
//     res.status(500).json({ error: 'Failed to retrieve posts' });
//   }
// }

// Controller function for editing a post
async function editPost(req, res) {
  const { postId, title, content } = req.body;

  try {
    // Find the post by its ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post's title and content
    post.title = title;
    post.content = content;

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post as the response
    res.json(updatedPost);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: `Failed to edit post: ${error.message}` });
  }
}


// Controller function for getting Followed Posts
async function getFollowedPosts(req, res) {
  const { userId } = req.body;

  try {
    // Check if the current user exists
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    // Retrieve the IDs of the users being followed by the current user
    const followedUserIds = currentUser.following;
    console.log(followedUserIds)
    // Retrieve the posts created by the followed users
    const followedPosts = await Post.find({ author: { $in: followedUserIds } });
    // const count = await Post.countDocuments({ author: { $in: followedUserIds } });


    // console.log('Total Count:', count);

    res.status(200).json(followedPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve followed posts' });
  }
}



// Export the controller functions
module.exports = {
  deletePost,
  createPost,
  getAllPosts,
  editPost,
  getFollowedPosts,
};

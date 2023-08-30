const User = require('../models/User.js');
const fs = require('fs');
// const sharp = require('sharp');



// async function convertAndSaveToJpeg(imageBuffer, outputPath) {
//   try {
//     // Convert image to JPEG format using sharp
//     const jpegBuffer = await sharp(imageBuffer)
//       .jpeg()
//       .toBuffer();

//     // Save the converted image to the specified output path
//     fs.writeFileSync(outputPath, jpegBuffer);

//     return outputPath; // Return the path where the image was saved
//   } catch (error) {
//     throw new Error('Failed to convert and save image to JPEG');
//   }
// }

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
// Controller function for updating user profile
async function updateProfile(req, res) {
  const { bio, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's bio if provided
    if (bio) {
      user.bio = bio;
    }

    // Check if an image file was uploaded
    if (req.file) {
      // Read the image file content
      const imageBuffer = fs.readFileSync(req.file.path);
      user.profilePhoto = {
        data: imageBuffer,
        contentType: req.file.mimetype
      };
      // Usage example
      // const inputImageBuffer = imageBuffer // Provide your image buffer here
      // const outputFolderPath = './new';
      // const outputFileName = 'new-image';

      // const outputPath = `${outputFolderPath}${outputFileName}.jpg`;

      // convertAndSaveToJpeg(inputImageBuffer, outputPath)
      //   .then(savedPath => {
      //     console.log(`Image converted and saved to: ${savedPath}`);
      //   })
      //   .catch(error => {
      //     console.error(error.message);
      //   });
      fs.unlinkSync(req.file.path);
    }

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
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
    if (user && await user.comparePassword(password)) {
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



// Controller function for follow a user
async function followUser(req, res) {
  const { userId, followId } = req.body;

  try {
    // Check if the current user exists
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    // Check if the user to follow exists
    const userToFollow = await User.findById(followId);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User to follow not found' });
    }

    // Check if the current user is already following the user to follow
    const isFollowing = currentUser.following.includes(followId);

    if (isFollowing) {
      // Unfollow the user by removing their ID from the following array
      currentUser.following.pull(followId);
      await currentUser.save();

      return res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      // Follow the user by adding their ID to the following array
      currentUser.following.push(followId);
      await currentUser.save();

      return res.status(200).json({ message: 'User followed successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow/unfollow user' });
  }
}



// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  followUser,
  updateProfile,
};

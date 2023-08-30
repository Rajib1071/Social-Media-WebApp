const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  followers: [{ // New field for followers
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  bio: { type: String },
  profilePhoto: {
    data: Buffer,
    contentType: String
  },
});

// Add a pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to compare the password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // Add more fields as needed
}, {
  timestamps: true, // Enable timestamps for the conversation
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

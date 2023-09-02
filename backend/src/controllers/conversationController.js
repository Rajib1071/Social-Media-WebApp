const Conversation = require('../models/Conversation');
const User = require('../models/User');

// Function to create a new conversation
exports.createConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    // Check if all participants exist
    const users = await User.find({ _id: { $in: participants } });

    if (users.length !== participants.length) {
      return res.status(400).json({ message: 'Invalid participants' });
    }

    // Create a new conversation
    const conversation = new Conversation({
      participants,
    });

    // Save the conversation to the database
    await conversation.save();

    return res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating conversation' });
  }
};

// Function to retrieve conversations by user ID
exports.getConversationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find conversations where the user is a participant
    const conversations = await Conversation.find({ participants: userId });

    return res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving conversations' });
  }
};

// Add more conversation-related controller functions as needed

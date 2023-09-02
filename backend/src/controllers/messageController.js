const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Function to send a message
exports.sendMessage = async (req, res) => {
  try {
    const { text, sender, conversationId } = req.body;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Create a new message
    const message = new Message({
      text,
      sender,
      conversationId,
    });

    // Save the message to the database
    await message.save();

    // Optionally, you can emit a WebSocket event to notify other participants
    // in the conversation about the new message

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending message' });
  }
};

// Function to retrieve messages by conversation ID
exports.getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Find messages for the specified conversation
    const messages = await Message.find({ conversationId }).sort({ createdAt: 'asc' });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving messages' });
  }
};

// Add more message-related controller functions as needed

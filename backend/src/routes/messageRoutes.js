const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

// Define routes for message-related operations
router.post('/send', MessageController.sendMessage);
router.get('/conversation/:conversationId', MessageController.getMessagesByConversation);
// Add more routes as needed (e.g., delete messages)

module.exports = router;

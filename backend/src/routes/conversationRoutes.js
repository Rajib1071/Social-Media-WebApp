const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversationController.js');

// Define routes for conversation-related operations
router.post('/create', ConversationController.createConversation);
router.get('/user/:userId', ConversationController.getConversationsByUser);
// Add more routes as needed (e.g., add/remove participants)

module.exports = router;

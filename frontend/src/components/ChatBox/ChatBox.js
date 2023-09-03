import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios'; // Import Axios

const dummyUser = {
    id: 1,
    username: "exampleuser",
    avatarUrl: "assets/person/dp1.png", // Replace with an actual avatar URL
  };
  const dummyMessages = [
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "user1",
      timestamp: "2023-09-02 10:30 AM",
    },
    {
      id: 2,
      text: "I'm good, thanks!",
      sender: "user2",
      timestamp: "2023-09-02 10:35 AM",
    },
    {
      id: 3,
      text: "What have you been up to?",
      sender: "user1",
      timestamp: "2023-09-02 10:40 AM",
    },
    {
      id: 4,
      text: "Just working on some projects.",
      sender: "user2",
      timestamp: "2023-09-02 10:45 AM",
    },
    {
      id: 5,
      text: "That sounds interesting!",
      sender: "user1",
      timestamp: "2023-09-02 10:50 AM",
    },
    {
      id: 6,
      text: "Yes, it's been quite busy lately.",
      sender: "user2",
      timestamp: "2023-09-02 10:55 AM",
    },
    {
      id: 7,
      text: "How about you?",
      sender: "user2",
      timestamp: "2023-09-02 11:00 AM",
    },
    {
      id: 8,
      text: "I'm working on a new project too.",
      sender: "user1",
      timestamp: "2023-09-02 11:05 AM",
    },
    {
      id: 9,
      text: "That's great! What's it about?",
      sender: "user2",
      timestamp: "2023-09-02 11:10 AM",
    },
    {
      id: 10,
      text: "It's about building a chat application!",
      sender: "user1",
      timestamp: "2023-09-02 11:15 AM",
    },
    // Add more sample messages as needed
  ];
  
  
function ChatBox({ conversationId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!conversationId) {
      // If there's no conversation selected, don't fetch messages
      return;
    }

    // Fetch messages by conversation ID
    axios.get(`http://localhost:3001/api/message/conversation/${conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [conversationId]);
  return (
    <div className="chat-box">
      <ChatHeader user={dummyUser} />
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
}

export default ChatBox;

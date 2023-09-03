import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import axios from 'axios'; // Import Axios
import './ChatBox.css'; // Import the CSS file
import Message from './Message';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../AppContext';

const dummyUser = {
  id: 1,
  username: "exampleuser",
  avatarUrl: "assets/person/dp1.png", // Replace with an actual avatar URL
};


function ChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [sendmessage, setSendMessage] = useState('');
  const { state: { currentUser } } = useAppContext();
  const handleSendMessage = async () => {
    try {
      // Check if the message is not empty
      if (!sendmessage.trim()) {
        return;
      }

      // Create a new message object
      const newMessage = {
        text: sendmessage,
        sender: currentUser._id, // Assuming you have currentUser defined
        conversationId: selectedUser.conversationId,
      };

      // Make a POST request to your server to send the message
      const response = await axios.post('http://localhost:3001/api/message/send', newMessage);
      // Check the response status code
      // Check the response status code
      if (response.status === 201) {
        console.log('Message sent successfully');
        toast.success('Send successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
        });
      } else {
        console.error('Failed to send message');
      }

      // Clear the message input field after sending
      setSendMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!selectedUser.conversationId) {
      // If there's no conversation selected, don't fetch messages
      return;
    }

    // Fetch messages by conversation ID
    axios.get(`http://localhost:3001/api/message/conversation/${selectedUser.conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [selectedUser.conversationId]);
  return (
    <div className="chat-box">
      <ChatHeader user={selectedUser} />
      <div className="message-list">

        {messages.map((message) => (
          <Message key={message._id} message={message} username={selectedUser.userName} />
        ))}
      </div>
      <div className="message-input">
        <ToastContainer /> {/* Place the ToastContainer here */}
        <input
          type="text"
          placeholder="Type your message..."
          value={sendmessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;

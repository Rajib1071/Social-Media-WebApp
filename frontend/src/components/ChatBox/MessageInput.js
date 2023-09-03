import React, { useState } from 'react';
import './MessageInput.css'; // Import the CSS file
import { useAppContext } from '../../AppContext';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MessageInput({ conversationId }) {
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
        conversationId,
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


  return (
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
  );
}

export default MessageInput;

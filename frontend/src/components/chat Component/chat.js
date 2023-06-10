import React, { useEffect, useState } from 'react';
import './chat.css';

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Function to handle sending a message
  const sendMessage = () => {
    socket.send(inputMessage);
    setInputMessage('');
  };

  // Function to handle receiving a message
  const receiveMessage = (event) => {
    const message = event.data;
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Event listener for receiving messages from the server
  useEffect(() => {
    socket.addEventListener('message', receiveMessage);

    return () => {
      socket.removeEventListener('message', receiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

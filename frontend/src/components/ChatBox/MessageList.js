import React from 'react';
import Message from './Message';
import './MessageList.css'; // Import the CSS file
function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

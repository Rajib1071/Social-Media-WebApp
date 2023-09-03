import React from 'react';
import Message from './Message';
import './MessageList.css'; // Import the CSS file
function MessageList({ messages }) {
  return (
    <div className="message-list">
      {console.log(messages)}
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

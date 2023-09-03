import React from 'react';
import Message from './Message';
import './MessageList.css'; // Import the CSS file
function MessageList({ data }) {
  const { messages, username } = data;
  return (
    <div className="message-list">
     
      {messages.map((message) => (
        <Message key={message._id} message={message} username={username}/>
      ))}
    </div>
  );
}

export default MessageList;

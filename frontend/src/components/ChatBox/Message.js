import React from 'react';
import { useAppContext } from '../../AppContext';
function Message({ message, username }) {
  const { text, sender, timestamp } = message;
  const { state: { currentUser } } = useAppContext();

  // Determine the sender's name based on the current user and message sender
  const senderName = sender === currentUser._id ? currentUser.username : username;
  
  return (
    <div className={`message ${sender === currentUser._id ? 'own-message' : ''}`}>
      
      {sender && <div className="sender-name">{senderName}</div>}
      <div className="message-text">{text}</div>
      {timestamp && (
        <div className="message-timestamp">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

export default Message;

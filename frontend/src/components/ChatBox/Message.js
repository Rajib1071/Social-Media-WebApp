import React from 'react';
import { useAppContext } from '../../AppContext';
function Message({ message }) {
  const { text, sender, timestamp } = message;
  const { state: { currentUser } } = useAppContext();
  
  return (
    <div className={`message ${sender === currentUser._id ? 'own-message' : ''}`}>
      
      {sender && <div className="sender-name">{sender}</div>}
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

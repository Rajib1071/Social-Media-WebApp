import React from 'react';
import { useAppContext } from '../../AppContext';
import { format } from "timeago.js";

function Message({ message, username }) {
  const { text, sender, createdAt } = message;
  const { state: { currentUser } } = useAppContext();

  // Determine the sender's name based on the current user and message sender
  const senderName = sender === currentUser._id ? currentUser.username : username;
  
  return (
    <div className={`message ${sender === currentUser._id ? 'own-message' : ''}`}>
      
      {sender && <div className="sender-name">{senderName}</div>}
      <div className="message-text">{text}</div>
      {createdAt && (
        <div className="message-createdAt">
          {/* {format(createdAt)} */}
          {new Date(createdAt).toLocaleTimeString()}
          {/* {new Date(createdAt).toLocaleString()} */}
        </div>
      )}
    </div>
  );
}

export default Message;

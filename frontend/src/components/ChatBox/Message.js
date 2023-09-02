import React from 'react';

function Message({ message }) {
  const { text, sender, timestamp } = message;

  return (
    <div className={`message ${sender === 'user1' ? 'own-message' : ''}`}>
      {sender && <div className="sender-name">{sender}</div>}
      <div className="message-text">{text}</div>
      {timestamp && <div className="message-timestamp">{timestamp}</div>}
    </div>
  );
}

export default Message;

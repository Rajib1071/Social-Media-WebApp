import React, { useState } from 'react';
import './MessageInput.css'; // Import the CSS file
function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Implement sending messages logic here
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;

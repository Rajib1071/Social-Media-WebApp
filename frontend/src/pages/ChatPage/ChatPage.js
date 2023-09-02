import React from 'react';
import Topbar from '../../components/layout/Topbar';
import ChatleftBar from '../../components/ChatLeftBar/ChatLeftBar';
import ChatBox from '../../components/ChatBox/ChatBox';
import './ChatPage.css';

function ChatPage() {
  return (
    <div className="chat-page">
      <Topbar />
      <div className="chat-content">
        <ChatleftBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default ChatPage;

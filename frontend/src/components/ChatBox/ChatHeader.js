import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import './ChatHeader.css'; // Import the CSS file

function ChatHeader({ user }) {
    return (
        <div className="chat-header">
            <Link to={`/profile`} className="profile-link">
                <Avatar alt={user.userName} src={user.imageUrl} className="user-avatar" />
                <span className="user-username">{user.userName}</span>
            </Link>
        </div>
    );
}

export default ChatHeader;

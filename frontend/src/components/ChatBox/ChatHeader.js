import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import './ChatHeader.css'; // Import the CSS file

function ChatHeader({ user }) {
    return (
        <div className="chat-header">
            <Link to={`/profile`} className="profile-link">
                <Avatar alt={user.username} src={user.avatarUrl} className="user-avatar" />
                <span className="user-username">{user.username}</span>
            </Link>
        </div>
    );
}

export default ChatHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import './ChatLeftBar.css'; // Import the CSS file
const dummyUsers = [
  {
    id: 1,
    username: "user1",
    avatarUrl: "assets/person/dp1.png",
  },
  {
    id: 2,
    username: "user2",
    avatarUrl: "assets/person/dp1.png",
  },
  {
    id: 3,
    username: "user3",
    avatarUrl: "assets/person/dp1.png",
  },
];
function ChatLeftBar() {
  return (
    <div className="chat-Left-bar">
       <div className="search-bar">
        <SearchIcon className="search-icon" />
        <input type="text" placeholder="Search users" className="search-input" />
      </div>
      <h2>Chat Users</h2>
      <ul>
        {dummyUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/profile`} className="profile-link">
              <Avatar alt={user.username} src={user.avatarUrl} />
              <span className="user-username">{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatLeftBar;

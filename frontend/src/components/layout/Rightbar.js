import React from 'react';
import Avatar from '@mui/material/Avatar';
import './RightbarStyles.css'; // Import right bar styles

const RightBar = () => {
  return (
    <div className="right-bar">
      <div className="right-bar-section">
        <h2>My Friends</h2>
        <ul className="friend-list">
          {/* List of friends */}
          <li>
            <Avatar alt="Friend 1" src="assets/person/dp2.png" />
            <span>Friend 1</span>
          </li>
          {/* Add more friend items */}
        </ul>
        <div className="see-all-link">
          <a href="/my-friends">See All</a>
        </div>
      </div>
      <div className="right-bar-section">
        <h2>Suggested Friends</h2>
        <ul className="friend-list">
          {/* Suggested friends */}
          <li>
            <Avatar alt="Suggested Friend 1" src="assets/person/dp3.png" />
            <span>Suggested Friend 1</span>
          </li>
          {/* Add more suggested friend items */}
        </ul>
        <div className="see-all-link">
          <a href="/suggested-friends">See All</a>
        </div>
      </div>
    </div>
  );
};

export default RightBar;

import React from 'react';
import { Link } from 'react-router-dom';
import './TopbarStyles.css'; 

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/" className="logo">
          My Social App
        </Link>
      </div>
      <div className="top-bar-center">
        <ul className="nav-links">
          <li>
            <Link to="/explore" className="top-bar-link">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="top-bar-link">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/messages" className="top-bar-link">
              Messages
            </Link>
          </li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="top-bar-right">
        <Link to="/settings" className="top-bar-link">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

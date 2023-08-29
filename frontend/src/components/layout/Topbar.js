import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import './TopbarStyles.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/" className="logo">
          InstaPost
        </Link>
      </div>
      <div className="top-bar-center">
        <ul className="nav-links">
          <li>
            <Link to="/people" className="top-bar-link">
              <PeopleIcon />
            </Link>
          </li>
          <li>
            <Link to="/explore" className="top-bar-link">
              <ExploreIcon />
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="top-bar-link">
              <NotificationsIcon />
            </Link>
          </li>
          <li>
            <Link to="/messages" className="top-bar-link">
              <MessageIcon />
            </Link>
          </li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <SearchIcon className="search-icon" />
        </div>
      </div>
      <div className="top-bar-right">
        <Link to="/profile" className="top-bar-link">
          <Avatar
            alt="User Profile"
            src="assets/person/mydp.jpeg"
            className="user-avatar"
          />
        </Link>
        <Link to="/settings" className="top-bar-link">
          <SettingsIcon />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

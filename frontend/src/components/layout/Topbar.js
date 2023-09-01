import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import './TopbarStyles.css';
import { useAppContext } from '../../AppContext';

const TopBar = () => {
  const [imageSrc, setImageSrc] = useState('');
  const { state: { currentUser } } = useAppContext();
  

  useEffect(() => {
    if (currentUser.profilePhoto && currentUser.profilePhoto.data) {
      const arrayBufferView = new Uint8Array(currentUser.profilePhoto.data.data);// Create a Uint8Array from the Buffer's data
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });// Create a Blob from the Uint8Array
      const imageUrl = URL.createObjectURL(blob);// Create a temporary object URL for the Blob
      setImageSrc(imageUrl);// Set the image source URL to the temporary URL
  }
  }, [currentUser]);
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
        <Link to={`/profile/${currentUser && currentUser._id}`} className="profile-link">
          <Avatar
            alt={currentUser && currentUser.username}
            src={currentUser && imageSrc}
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

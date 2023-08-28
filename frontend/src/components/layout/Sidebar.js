import React from 'react';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import './SidebarStyles.css'; // Import sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
    
      <Link to="/events" className="sidebar-link">
        <EventIcon className="sidebar-icon" />
        Events
      </Link>
      <Link to="/groups" className="sidebar-link">
        <GroupIcon className="sidebar-icon" />
        Groups
      </Link>
      <Link to="/saved" className="sidebar-link">
        <BookmarkIcon className="sidebar-icon" />
        Saved
      </Link>
      <Link to="/help" className="sidebar-link">
        <HelpIcon className="sidebar-icon" />
        Help & Support
      </Link>
    </div>
  );
};

export default Sidebar;

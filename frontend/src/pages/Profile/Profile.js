import React from 'react';
import './profileStyles.css'; // Import home styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import ProfileContent from './ProfileContent'; // Create this component

const Profile = () => {
  return (
    <div className="home-container">
      <Topbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <ProfileContent />
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

export default Profile;

import React from 'react';

import './homeStyles.css'; // Import home styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import Feed from '../../components/Feed/Feed';

const Home = () => {
  return (
    <div className="home-container">
      <Topbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <Feed />
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;

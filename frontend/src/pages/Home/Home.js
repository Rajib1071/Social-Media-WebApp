import React, { useState, useEffect } from 'react';
import { useAppContext} from '../../AppContext';
import './homeStyles.css'; // Import home styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import Feed from '../../components/Feed/Feed';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const { dispatch, currentUser } = useAppContext(); // Get the dispatch function from the context
  const { state: { currentUser } } = useAppContext();
  // console.log('Before useEffect - currentUser:', currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser !== undefined) {
      console.log('Inside useEffect - currentUser:', currentUser);
      // You can perform other actions here
    }
  }, [currentUser]);
  //   useEffect(() => {
  //   if (!currentUser) {
  //     navigate('/login');
  //   }
  // }, [currentUser, navigate]);
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

import React, { useState, useEffect } from 'react';
import './RightbarStyles.css'; // Import right bar styles
import ProfileLink from '../ProfileLink/ProfileLink';
import axios from 'axios';
import { useAppContext } from '../../AppContext';

const RightBar = () => {
  const [latestUserIds, setLatestUserIds] = useState([]);
  const { state: { currentUser } } = useAppContext();
  useEffect(() => {
    // Make an HTTP GET request to fetch the latest user IDs
    axios.get('http://localhost:3001/api/users/latest-users')
      .then(response => {
        // Extract the user IDs from the response data
        const ids = response.data;

        // Update the state with the retrieved user IDs
        setLatestUserIds(ids);
      })
      .catch(error => {
        console.error('Failed to fetch latest user IDs:', error);
      });
  }, []);
  return (
    <div className="right-bar">
      <div className="right-bar-section">
        <h2>People you follow</h2>
        <ul className="friend-list">
          {/* Map through the retrieved user IDs and render ProfileLink for each */}
           {currentUser && currentUser.following.map(userId => (
            <li key={userId}>
              <ProfileLink authorId={userId} />
            </li>
          ))}
        </ul>
        <div className="see-all-link">
          <a href="/my-friends">See All</a>
        </div>
      </div>
      <div className="right-bar-section">
        <h2>People follows you</h2>
        <ul className="friend-list">
          {/* Map through the retrieved user IDs and render ProfileLink for each */}
           {currentUser && currentUser.followers.map(userId => (
            <li key={userId}>
              <ProfileLink authorId={userId} />
            </li>
          ))}
        </ul>
        <div className="see-all-link">
          <a href="/my-friends">See All</a>
        </div>
      </div>
      <div className="right-bar-section">
        <h2>Suggested for you</h2>
        <ul className="friend-list">
          {/* Map through the retrieved user IDs and render ProfileLink for each */}
          {latestUserIds.map(userId => (
            <li key={userId}>
              <ProfileLink authorId={userId} />
            </li>
          ))}
        </ul>
        <div className="see-all-link">
          <a href="/suggested-friends">See All</a>
        </div>
      </div>
    </div>
  );
};

export default RightBar;

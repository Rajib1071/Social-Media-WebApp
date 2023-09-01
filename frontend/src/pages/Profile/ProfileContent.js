import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import './profileContentStyles.css';
import axios from 'axios';

const ProfileContent = ({ profileId }) => {
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isMyProfile, setisMyProfile] = useState(true);
  const userId = '64f064c345337ef66d3c86e2';
  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/details/${profileId}`);
            
            if (response.status === 200) {
                setUser(response.data);

                if (response.data.profilePhoto && response.data.profilePhoto.data) {
                    const arrayBufferView = new Uint8Array(response.data.profilePhoto.data.data);
                    const blob = new Blob([arrayBufferView], { type: response.data.profilePhoto.contentType });
                    const imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                }
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchUserDetails();
}, [userId]);

useEffect(() => {
  // Check if userId matches profileId and set isMyProfile accordingly
  setisMyProfile(userId === profileId);
}, [userId, profileId]); // Run this effect when userId or profileId change

  const duser = {
    name: 'Rajib Mondal',
    avatar: 'assets/person/mydp.jpeg', // Replace with the actual path to the avatar image
    followers: 500,
    following: 300,
    posts: 50,
    bio: 'Software Developer | Nature Lover | Travel Enthusiast',
  };

  return (
    <div className="profile">
      <div className="profile-header">
      <Avatar alt={user && user.name} src={imageSrc} className="profile-avatar" style={{ width: '150px', height: '150px' }} /> 
        <div className="profile-header-details">
          <h2 className="profile-name">{user && user.username}</h2>
          <div className="profile-stats">
            <span className="profile-stat">
              {user && user.posts} Posts
            </span>
            <span className="profile-stat">
              {user && user.followers} Followers
            </span>
            <span className="profile-stat">
              {user && user.following} Following
            </span>
          </div>
        </div>
      </div>
      <p className="profile-bio">{user && user.bio}</p>
      {isMyProfile ? null : <button className="follow-button">Follow</button>}
    </div>
  );
};

export default ProfileContent;

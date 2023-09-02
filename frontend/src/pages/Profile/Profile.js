import React, { useState, useEffect } from 'react';
import './profileStyles.css'; // Import profile styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import ProfileContent from './ProfileContent'; // Create this component
import EditProfile from './EditProfile';
import Post from '../../components/Post/Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const Profile = () => {
  const [isFollowingUser, setIsFollowingUser] = useState(false); // Initialize with an appropriate initial value
  const { profileId } = useParams();
  const [posts, setPosts] = useState([]); // State to hold posts
  const [isMyProfile, setisMyProfile] = useState(false);
  const { state: { currentUser } } = useAppContext();
  const userId = currentUser._id;
  

  const [selectedOption, setSelectedOption] = useState('my-posts'); // Default selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Check if userId matches profileId and set isMyProfile accordingly
    setisMyProfile(userId === profileId);
    async function fetchPosts() {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/user/${profileId}`); // Replace with your actual endpoint
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [userId, profileId]); // Run this effect when userId or profileId changes

  return (
    <div className="profile-container">
      <Topbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <div className="profile-content">
            <ProfileContent profileId={profileId}/>
          </div>
          <div className="profile-options">
            <div className="options-buttons">
              <button
                className={selectedOption === 'my-posts' ? 'active' : ''}
                onClick={() => handleOptionClick('my-posts')}
              >
                {/* My posts */}
                Posts
              </button>
              {isMyProfile ? <button
                className={selectedOption === 'edit-profile' ? 'active' : ''}
                onClick={() => handleOptionClick('edit-profile')}
              >
                Edit Profile
              </button> : null}

              {/* Add more options as needed */}
            </div>
            {/* Render the appropriate component based on the selected option */}
            {selectedOption === 'my-posts' && (
              <div className="post-list">
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            )}
            {selectedOption === 'edit-profile' && <EditProfile />}
            {/* Add more components for other options */}
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

export default Profile;

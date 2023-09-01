import React, { useState, useEffect } from 'react';
import './profileStyles.css'; // Import profile styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import ProfileContent from './ProfileContent'; // Create this component
import EditProfile from './EditProfile'; 
import Post from '../../components/Post/Post'; 
import axios from 'axios'; 

const Profile = () => {
  const [posts, setPosts] = useState([]); // State to hold posts

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get('http://localhost:3001/api/posts/user/64f03f378c3e15f65b642471'); // Replace with your actual endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []); // Empty dependency array means this effect runs only once after initial render
  const [selectedOption, setSelectedOption] = useState('my-posts'); // Default selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="profile-container">
      <Topbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <div className="profile-content">
            <ProfileContent />
          </div>
          <div className="profile-options">
            <div className="options-buttons">
              <button
                className={selectedOption === 'my-posts' ? 'active' : ''}
                onClick={() => handleOptionClick('my-posts')}
              >
                My Posts
              </button>
              <button
                className={selectedOption === 'edit-profile' ? 'active' : ''}
                onClick={() => handleOptionClick('edit-profile')}
              >
                Edit Profile
              </button>
              {/* Add more options as needed */}
            </div>
            {/* Render the appropriate component based on the selected option */}
            {selectedOption === 'my-posts' && (
              <div className="post-list">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
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

import React, { useState } from 'react';
import './profileStyles.css'; // Import profile styles
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import Rightbar from '../../components/layout/Rightbar';
import ProfileContent from './ProfileContent'; // Create this component
import EditProfile from './EditProfile'; // Create this component
import Post from '../../components/Feed/Post'; // Create this component

const Profile = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: 'Puja Singh',
        avatar: "assets/person/dp3.png",
      },
      content: 'Just had a great time at the park!',
      photo: 'assets/post/post1.png',
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        avatar: "assets/person/dp4.png",
      },
      content: 'Feeling excited about the upcoming event!',
      photo: 'assets/post/post2.png',
    },
    // Add more post objects
  ];
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

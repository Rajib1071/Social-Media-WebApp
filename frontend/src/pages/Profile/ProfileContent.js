import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import './profileContentStyles.css';
import axios from 'axios';
import { useAppContext } from '../../AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileContent = ({ profileId }) => {
  const [isFollowingUser, setIsFollowingUser] = useState(false); // Initialize with an appropriate initial value
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isMyProfile, setisMyProfile] = useState(true);
  const { state: { currentUser } } = useAppContext();
  const userId = currentUser._id;
  //   useEffect(() => {

  //     const fetchUserDetails = async () => {
  //         try {
  //             const response = await axios.get(`http://localhost:3001/api/users/details/${profileId}`);

  //             if (response.status === 200) {
  //                 setUser(response.data);

  //                 if (response.data.profilePhoto && response.data.profilePhoto.data) {
  //                     const arrayBufferView = new Uint8Array(response.data.profilePhoto.data.data);
  //                     const blob = new Blob([arrayBufferView], { type: response.data.profilePhoto.contentType });
  //                     const imageUrl = URL.createObjectURL(blob);
  //                     setImageSrc(imageUrl);
  //                 }
  //             }
  //         } catch (error) {
  //             console.error('Error fetching user details:', error);
  //         }
  //     };

  //     fetchUserDetails();
  // }, [userId]);
  const handleFollowUser = async () => {
    try {

      const response = await axios.post('http://localhost:3001/api/users/follow', {
        userId: currentUser._id, // The current user's ID
        followId: profileId, // The ID of the user being viewed
      });


      if (response.status === 200) {
        // The follow/unfollow was successful
        toast.success('Follow/unfollow done ', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
        setIsFollowingUser(!isFollowingUser); // Update the state
      } else {
        // Handle errors or show a notification to the user
        console.error('Follow/unfollow failed');
      }
    } catch (error) {
      console.error('Follow/unfollow failed', error);
    }
  };
  useEffect(() => {
    // Check if userId matches profileId and set isMyProfile accordingly
    setisMyProfile(userId === profileId);
    const fetchUserDetails = async () => {
      try {
        // Skip fetching if userId and profileId are equal
        if (userId === profileId) {
          setUser({
            bio: currentUser && currentUser.bio,
            username: currentUser && currentUser.username,
            following: currentUser && currentUser.following.length,
            posts: currentUser && currentUser.posts.length,
            followers: currentUser && currentUser.followers.length,
          });
          if (currentUser.profilePhoto && currentUser.profilePhoto.data) {
            const arrayBufferView = new Uint8Array(currentUser.profilePhoto.data.data);
            const blob = new Blob([arrayBufferView], { type: currentUser.profilePhoto.contentType });
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
          }
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/users/details/${profileId}?currentUserId=${currentUser._id}`);

        if (response.status === 200) {
          setUser(response.data);
          setIsFollowingUser(response.data.isFollowingUser)
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
  }, [userId, profileId,currentUser.posts.length,currentUser.following.length,currentUser.followers.length]); // Run this effect when userId or profileId change

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
      <ToastContainer /> 
      <div className="profile-header">
        <Avatar alt={user && user.username} src={imageSrc} className="profile-avatar" style={{ width: '150px', height: '150px' }} />
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
      {isMyProfile ? null : <button className="follow-button" onClick={handleFollowUser}>
        {isFollowingUser ? 'Unfollow' : 'Follow'}
      </button>}
    </div>
  );
};

export default ProfileContent;

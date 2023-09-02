import React, { useState, useEffect } from 'react';
import './editProfileStyles.css'; // Import the CSS file
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { useAppContext } from '../../AppContext';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const { state: { currentUser } } = useAppContext();
  const handleSaveChanges = async (e) => {
    // Handle saving changes to the profile
    // console.log('Name:', name);
    // console.log('Bio:', bio);
    // console.log('Profile Photo:', profilePhoto);
    // You can also send this data to the backend for processing
    const formData = new FormData();
    formData.append('username', name); // Add name
    formData.append('bio', bio); // Add bio
    formData.append('userId', currentUser._id); // Replace with the actual user ID
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto); // Append the image file to the FormData
    }
    try {
      const response = await axios.put('http://localhost:3001/api/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {

        console.log('Profile updated successfully');
        setBio('');
        setName('');
        setProfilePhoto(null);
        // Show success toast
        toast.success('Profile updated successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {

      console.error('Error updating profile:', error);
      toast.error('Error updating profile', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleProfilePhotoChange = (e) => {
    // Handle changing the profile photo
    const newProfilePhoto = e.target.files[0];
    setProfilePhoto(newProfilePhoto);
  };

  return (
    <div className="edit-profile-container">
      <ToastContainer /> {/* Place the ToastContainer here */}
      <h2>Edit Profile</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label>Profile Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />

        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

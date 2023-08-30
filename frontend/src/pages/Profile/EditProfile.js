import React, { useState } from 'react';
import './editProfileStyles.css'; // Import the CSS file

const EditProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleSaveChanges = () => {
    // Handle saving changes to the profile
    console.log('Name:', name);
    console.log('Bio:', bio);
    console.log('Profile Photo:', profilePhoto);
    // You can also send this data to the backend for processing
  };

  const handleProfilePhotoChange = (e) => {
    // Handle changing the profile photo
    const newProfilePhoto = e.target.files[0];
    setProfilePhoto(newProfilePhoto);
  };

  return (
    <div className="edit-profile-container">
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

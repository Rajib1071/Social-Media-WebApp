import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import api from '../../api';
import './ProfileLinkStyles.css';
const ProfileLink = ({ authorId }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        const response = await api.get(`/users/details/${authorId}`);
        if (response.status === 200) {
          const authorData = response.data;
          if (authorData.profilePhoto && authorData.profilePhoto.data) {
            const avatarArrayBufferView = new Uint8Array(authorData.profilePhoto.data.data);
            const avatarBlob = new Blob([avatarArrayBufferView], { type: 'image/jpeg' });
            const avatarUrl = URL.createObjectURL(avatarBlob);
            authorData.avatarUrl = avatarUrl;
          }
          setAuthor(authorData);
        } else {
          console.error('Error fetching author data');
        }
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    }
    fetchAuthorData();
  }, [authorId]);

  if (!author) {
    // You can return a loading indicator or placeholder here while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/profile/${author.id}`} className="profile-link">
      <Avatar alt={author.username} src={author.avatarUrl} />
      <span className="post-author">{author.username}</span>
    </Link>
  );
};

export default ProfileLink;

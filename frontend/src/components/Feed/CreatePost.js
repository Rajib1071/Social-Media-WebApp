import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Input from '@mui/material/Input';
import './createPostStyles.css';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [postPhoto, setPostPhoto] = useState(null);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Handle post submission
        // ...
        setPostContent('');
        setPostPhoto(null);
    };

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPostPhoto(selectedPhoto);
    };

    return (
        <div className="create-post">
            <form onSubmit={handlePostSubmit}>
                <div className="textarea-container">
                    <textarea
                        placeholder="Start a post"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows="1" /* Show only one line */
                    />
                </div>
                <div className="media-section">
                    <label htmlFor="post-photo-input">
                        <Input
                            type="file"
                            id="post-photo-input"
                            inputProps={{ accept: 'image/*' }}
                            style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                        />
                        <AddPhotoAlternateIcon className="media-icon" />
                    </label>
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;

import React, { useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Input from '@mui/material/Input';
import './createPostStyles.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [postPhoto, setPostPhoto] = useState(null);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        // Handle post submission

        const formData = new FormData();
        formData.append('title', 'New Post Title'); // Add your post title
        formData.append('content', postContent); // Add post content
        formData.append('userId', '64f03f378c3e15f65b642471'); // Replace with the actual user ID

        if (postPhoto) {
            formData.append('image', postPhoto); // Append the image file to the FormData
        }

        try {
            const response = await axios.post('http://localhost:3001/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                // Handle success (e.g., show a success message or redirect)
                console.log('Post created successfully');
                setPostContent('');
                setPostPhoto(null);
                // Show success toast
                toast.success('Post created successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // Close after 3 seconds
                });
                // Reload the page after successful post
                // window.location.reload();
                // Reload the page after a delay of 3 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error creating post:', error);
            toast.error('Error creating post', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // Close after 3 seconds
            });
        }
    };

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPostPhoto(selectedPhoto);
    };

    return (
        <div className="create-post">
            <ToastContainer /> {/* Place the ToastContainer here */}
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
                    {postPhoto && (
                        <div className="uploaded-photo-container">
                            <img
                                src={URL.createObjectURL(postPhoto)}
                                alt="Uploaded"
                                className="uploaded-photo"
                            />
                            <p className="caption">Uploaded Photo</p>
                        </div>
                    )}
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;

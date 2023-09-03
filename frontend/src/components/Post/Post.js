import React, { useState, useEffect } from 'react';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './postStyles.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { useAppContext, REMOVE_POST_FROM_USER } from '../../AppContext';
import ProfileLink from '../ProfileLink/ProfileLink';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes.length || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // For anchor element of the menu
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editedContent, setEditedContent] = useState(post.content); // Track edited content
    const [imageSrc, setImageSrc] = useState('');
    const [author, setAuthor] = useState(null);
    const [editedTitle, setEditedTitle] = useState(''); // Track edited content
    const { state: { currentUser } } = useAppContext();
    const { dispatch } = useAppContext();
    // const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id)); // Set isLiked based on user's like status
        if (post.image && post.image.data) {
            const arrayBufferView = new Uint8Array(post.image.data.data);// Create a Uint8Array from the Buffer's data
            const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });// Create a Blob from the Uint8Array
            const imageUrl = URL.createObjectURL(blob);// Create a temporary object URL for the Blob
            setImageSrc(imageUrl);// Set the image source URL to the temporary URL
        }

    }, [post]);

    // useEffect(() => {
    //        console.log("isedited");
    // }, [isEdited]);

    const handleDelete = async () => {
        setAnchorEl(null); // Close the menu

        try {
            const response = await axios.delete('http://localhost:3001/api/posts', {
                data: {
                    userId: currentUser._id, // Replace with the actual user ID
                    postId: post._id,
                },
            });

            if (response.status === 200) {
                // Dispatch the action to remove the post from the user's posts array
                dispatch({ type: REMOVE_POST_FROM_USER, payload: post._id });

                // Show success toast
                toast.success('Post deleted successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // setTimeout(() => {
                //     window.location.reload();
                // }, 3000);
                // // Optionally, you can update your state or re-fetch posts
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            // Show error toast
            toast.error('Error deleting post', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setAnchorEl(null); // Close the menu
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(post.content);
    };

    const handleSaveEdit = async () => {
        // Implement your save logic here
        try {
            const response = await axios.put(`http://localhost:3001/api/posts`, {
                postId: post._id,
                title: editedTitle,
                content: editedContent,
            });

            if (response.status === 200) {
                toast.success('Post edited successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // setTimeout(() => {
                //     window.location.reload();
                // }, 3000);
                // setIsEdited(true);
                
                post.content=response.data.content;
                // Exit edit mode
                setIsEditing(false);
            }
        } catch (error) {
            toast.error('Error editing post', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
        // Exit edit mode
        setIsEditing(false);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget); // Open the menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/posts/like', {
                postId: post._id, // Use the post's _id field
                userId: currentUser._id, // Replace with the actual userId of the current user
            });

            if (response.status === 200) {
                if (isLiked) {
                    setLikes(likes - 1);
                } else {
                    setLikes(likes + 1);
                }
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };


    const handleSave = () => {
        // Implement your edit logic here
        console.log('Save post:', post.id);
    };
    // const dummyAuthor = {
    //     name: 'UserName',
    //     avatar: 'assets/person/dp1.png', // Replace with the actual path to the dummy avatar image
    // };

    return (
        <div className="post">
            <ToastContainer /> {/* Place the ToastContainer here */}
            <div className="post-header">
                {/* Pass the author ID as a prop to the ProfileLink component */}
                <ProfileLink authorId={post.author} />
                <MoreVertIcon className="more-icon" onClick={handleOpenMenu} />
            </div>
            <p className="post-content">
                {isEditing ? (
                    <>
                        <textarea
                            className="post-content"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="edit-buttons">
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </>
                ) : (
                    post.content
                )}
            </p>
            {/* {post.photo && <img src={post.photo} alt="Post" className="post-photo" />} */}
            {/* {console.log(post.image.data.data)} */}
            {imageSrc && <img src={imageSrc} alt="Post" className="post-photo" />}
            <div className="post-options">
                <div className="post-option" onClick={handleLike}>
                    <ThumbUpIcon className={`option-icon ${isLiked ? 'liked' : ''}`} />
                    Like ({likes})
                </div>
                <div className="post-option">
                    <CommentIcon className="option-icon" />
                    Comment
                </div>
                <div className="post-option">
                    <ShareIcon className="option-icon" />
                    Share
                </div>
                <div className="post-option" onClick={handleSave}>
                    <BookmarkIcon className="option-icon" />
                    Save
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>Copy Link</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
            </Menu>

        </div>
    );
};

export default Post;

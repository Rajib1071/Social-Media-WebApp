import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
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


const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes.length || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // For anchor element of the menu
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editedContent, setEditedContent] = useState(post.content); // Track edited content
    const [imageSrc, setImageSrc] = useState('');
    const [author, setAuthor] = useState(null);
    const [editedTitle, setEditedTitle] = useState(''); // Track edited content

    useEffect(() => {
        setIsLiked(post.likes.includes('64f064c345337ef66d3c86e2')); // Set isLiked based on user's like status
        if (post.image && post.image.data) {
            const arrayBufferView = new Uint8Array(post.image.data.data);// Create a Uint8Array from the Buffer's data
            const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });// Create a Blob from the Uint8Array
            const imageUrl = URL.createObjectURL(blob);// Create a temporary object URL for the Blob
            setImageSrc(imageUrl);// Set the image source URL to the temporary URL
        }
        async function fetchAuthor() {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/details/${post.author}`);
                if (response.status === 200) {
                    const authorData = response.data;
                    if (authorData.profilePhoto && authorData.profilePhoto.data) {
                        const avatarArrayBufferView = new Uint8Array(authorData.profilePhoto.data.data);
                        const avatarBlob = new Blob([avatarArrayBufferView], { type: 'image/jpeg' });
                        const avatarUrl = URL.createObjectURL(avatarBlob);
                        authorData.avatarUrl = avatarUrl;
                    }
                    console.log(response.data)
                    setAuthor(authorData);
                } else {
                    console.error('Error fetching author data');
                }
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        }
        fetchAuthor();
    }, [post]);

    const handleDelete = async () => {
        setAnchorEl(null); // Close the menu

        try {
            const response = await axios.delete('http://localhost:3001/api/posts', {
                data: {
                    userId: '64f03f378c3e15f65b642471', // Replace with the actual user ID
                    postId: post._id,
                },
            });

            if (response.status === 200) {
                // Show success toast
                toast.success('Post deleted successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                // Optionally, you can update your state or re-fetch posts
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
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
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
                userId: '64f064c345337ef66d3c86e2', // Replace with the actual userId of the current user
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
                {/* <Avatar alt={post.author.name} src={post.author.avatar} /> */}
                <Avatar alt={author && author.username} src={author && author.avatarUrl} />
                {/* <span className="post-author">{post.author.name}</span> */}
                {/* console.log(author) */}
                <span className="post-author">{author && author.username}</span>
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

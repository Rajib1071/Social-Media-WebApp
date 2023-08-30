import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './postStyles.css';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // For anchor element of the menu


    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget); // Open the menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleSave = () => {
        // Implement your edit logic here
        console.log('Save post:', post.id);
    };

    return (
        <div className="post">
            <div className="post-header">
                <Avatar alt={post.author.name} src={post.author.avatar} />
                <span className="post-author">{post.author.name}</span>
                <MoreVertIcon className="more-icon" onClick={handleOpenMenu} />
            </div>
            <p className="post-content">{post.content}</p>
            {post.photo && <img src={post.photo} alt="Post" className="post-photo" />}
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
                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
            </Menu>
        </div>
    );
};

export default Post;

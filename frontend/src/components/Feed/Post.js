import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import './postStyles.css';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleEdit = () => {
        // Implement your edit logic here
        console.log('Edit post:', post.id);
    };

    return (
        <div className="post">
            <div className="post-header">
                <Avatar alt={post.author.name} src={post.author.avatar} />
                <span className="post-author">{post.author.name}</span>
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
                <div className="post-option" onClick={handleEdit}>
                    <EditIcon className="option-icon" />
                    Edit
                </div>
            </div>
        </div>
    );
};

export default Post;

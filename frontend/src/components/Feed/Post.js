import React from 'react';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import './postStyles.css';





const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="post-header">
                <Avatar alt={post.author.name} src={post.author.avatar} />
                <span className="post-author">{post.author.name}</span>
            </div>
            <p className="post-content">{post.content}</p>
            {post.photo && <img src={post.photo} alt="Post" className="post-photo" />}
            <div className="post-options">
                <div className="post-option">
                    <ThumbUpIcon className="option-icon" />
                    Like
                </div>
                <div className="post-option">
                    <CommentIcon className="option-icon" />
                    Comment
                </div>
                <div className="post-option">
                    <ShareIcon className="option-icon" />
                    Share
                </div>

            </div>
        </div>
    );
};

export default Post;



import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost'; // Import the CreatePost component
import Post from '../Post/Post'; // Import the Post component
import './feedStyles.css'; // Import feed styles

import api from '../../api';
import { useAppContext } from '../../AppContext';

const Feed = () => {
    const { state: { currentUser } } = useAppContext();
    const userId = currentUser._id;
    const [posts, setPosts] = useState([]); // State to hold posts

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await api.get(`/posts/user-followers/${userId}`); // Replace with your actual endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, [currentUser.posts.length]); // Empty dependency array means this effect runs only once after initial render
    return (
        <div className="feed">
            <CreatePost />
            <div className="post-list">
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;

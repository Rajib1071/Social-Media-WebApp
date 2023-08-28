import React from 'react';
import CreatePost from './CreatePost'; // Import the CreatePost component
import Post from './Post'; // Import the Post component
import './feedStyles.css'; // Import feed styles

const Feed = () => {
    // Dummy data for posts
    const posts = [
        {
            id: 1,
            author: {
                name: 'Puja Singh',
                avatar: "assets/person/dp3.png",
            },
            content: 'Just had a great time at the park!',
            photo: 'assets/post/post1.png',
        },
        {
            id: 2,
            author: {
                name: 'Jane Smith',
                avatar: "assets/person/dp4.png",
            },
            content: 'Feeling excited about the upcoming event!',
            photo: 'assets/post/post2.png',
        },
        // Add more post objects
    ];

    return (
        <div className="feed">
            <CreatePost />
            <div className="post-list">
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;

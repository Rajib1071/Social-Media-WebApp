import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Topbar from '../../components/layout/Topbar';
import axios from 'axios'; // Import Axios
import ChatBox from '../../components/ChatBox/ChatBox';
import './ChatPage.css';
import { useAppContext } from '../../AppContext';

function ChatPage() {
  const { state: { currentUser } } = useAppContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null); // Store selected conversation ID



  useEffect(() => {
    // Fetch conversations by the current user's ID
    axios.get(`http://localhost:3001/api/conversation/user/${currentUser._id}`)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
      });
  }, [currentUser._id]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (conversations.length === 0) {
        return; // Skip fetching user details if there are no conversations
      }

      const participantIds = conversations.reduce((ids, conversation) => {
        const filteredIds = conversation.participants.filter((id) => id !== currentUser._id);
        return [...ids, ...filteredIds];
      }, []);

      const userDetailPromises = participantIds.map(async (userId) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/details/${userId}?currentUserId=${currentUser._id}`);
          if (response.data.profilePhoto && response.data.profilePhoto.data) {
            const arrayBufferView = new Uint8Array(response.data.profilePhoto.data.data);
            const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
            response.data.imageUrl = URL.createObjectURL(blob);
            console.log('imageUrl:', response.data.imageUrl); // Add this line
          }
          return response.data;
        } catch (error) {
          console.error(`Error fetching user details for user ${userId}:`, error);
          return null;
        }
      });

      const userDetails = await Promise.all(userDetailPromises);
      console.log("here")
      const validUserDetails = userDetails.filter((detail) => detail !== null);
      setUsers(validUserDetails);
    };

    fetchUserDetails();
  }, [conversations, currentUser._id]);



  const handleUserClick = (userId) => {
    setSelectedUser(userId);

    // Find the conversation ID where the clicked user's ID exists in participants
    const conversationWithUser = conversations.find((conversation) =>
      conversation.participants.includes(userId)
    );

    if (conversationWithUser) {
      setSelectedConversationId(conversationWithUser._id);
    }
  };
  return (
    <div className="chat-page">
      <Topbar />
      <div className="chat-content">
        <div className="chat-Left-bar">
          <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input type="text" placeholder="Search users" className="search-input" />
          </div>
          <h2>Conversations</h2>
          <ul>

            {users && users.map((userDetail) => {
              // const imageUrl = getUserProfileImageUrl(userDetail); // Function to handle profilePhoto
              return (
                <li
                  key={userDetail.id}
                  className={selectedUser === userDetail.id ? "selected-user" : ""}
                  onClick={() => handleUserClick(userDetail.id)}
                >
                  
                  <div className="profile-link">
                    <Avatar alt={ userDetail.username} src={userDetail.imageUrl} />
                    {/* <img src={imageUrl} alt={userDetail.username} className="user-avatar" /> */}
                    <span className="user-username">{userDetail.username}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <ChatBox conversationId={selectedConversationId} /> {/* Pass conversationId */}
      </div>
    </div>
  );
}

export default ChatPage;

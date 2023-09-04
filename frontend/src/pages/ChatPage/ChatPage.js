import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Topbar from '../../components/layout/Topbar';
import axios from 'axios'; // Import Axios
import './ChatBox.css'; // Import the CSS file
import Message from '../../components/ChatBox/Message';
import './ChatPage.css';
import ChatHeader from '../../components/ChatBox/ChatHeader';
import { useAppContext } from '../../AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
function useForceUpdate() {
  const [, setState] = useState(0); // Use a dummy state variable

  const forceUpdate = () => {
    setState((prevState) => prevState + 1);
  };

  return forceUpdate;
}


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [sendmessage, setSendMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState(null);
  const { state: { currentUser } } = useAppContext();
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [sid, setsid] = useState();
  const socket = useRef();
  const forceUpdate = useForceUpdate();
  const selectedUser = useRef({
    id: null,
    imageUrl: null,
    conversationId: null,
    userName: null,
  });


  const scrollRef = useRef(null);
  //only first render time socket will be conncted


  console.log('Component rendered');

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {

      if (data.sender === selectedUser.current.id) {
        // Append the received message to the message list

        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });
  }, []);


  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      console.log(users)
    });

  }, [currentUser]);


  useEffect(() => {
    console.log(socket)
  }, [socket]);

  // Use a useEffect to log the updated selectedUser
  // useEffect(() => {
  //   console.log("selecteduser", selectedUser);

  // }, [selectedUser]);

  const handleSendMessage = async () => {
    try {
      // Check if the message is not empty
      if (!sendmessage.trim()) {
        return;
      }

      // Create a new message object
      const newMessage = {
        text: sendmessage,
        sender: currentUser._id, // Assuming you have currentUser defined
        conversationId: selectedUser.current.conversationId,
      };

      // Make a POST request to your server to send the message
      const response = await axios.post('http://localhost:3001/api/message/send', newMessage);

      // const receiverId = selectedUser.id; // Receiver's ID

      socket.current.emit("sendMessage", {
        receiverId: selectedUser.current.id,
        message: response.data, // Include the message data here
      });

      // Update the message state with the new message
      setMessages([...messages, response.data]);
      console.log("respne", response.data)
      // Clear the message input field after sending
      setSendMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (!selectedUser.current.conversationId) {
      // If there's no conversation selected, don't fetch messages
      return;
    }

    // Fetch messages by conversation ID
    axios.get(`http://localhost:3001/api/message/conversation/${selectedUser.current.conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [selectedUser.current.conversationId]);
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

  // useEffect(() => {
  //   console.log("After updating selectedUser:", selectedUser);
  // }, [selectedUser]);

  const handleUserClick = async (userDetail) => {
    // Find the conversation ID where the clicked user's ID exists in participants
    console.log('Before updating selectedUser:', selectedUser.current);
    const conversationWithUser = conversations.find((conversation) =>
      conversation.participants.includes(userDetail.id)
    );

    // Create a new object to update selectedUser
    const updatedUser = {
      id: userDetail.id,
      imageUrl: userDetail.imageUrl,
      userName: userDetail.username,
    };

    // Conditionally set the conversationId property if it exists
    if (conversationWithUser) {
      updatedUser.conversationId = conversationWithUser._id;
    }

    // setsid(userDetail.id)
    // Update the selectedUser state and wait for it to finish
    // Update the selectedUser state using the callback form of setState
    // Update the selectedUser state and use a callback function
    // Update the selectedUser state and wait for it to finish
    // Update the selectedUser ref with the new value
    selectedUser.current = updatedUser;
    forceUpdate(); // Trigger a re-render
    console.log(selectedUser.current);

    // Now you can access the updated selectedUser
    console.log(selectedUser.current); // This should show the updated value
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
                  className={selectedUser.current.id === userDetail.id ? "selected-user" : ""}
                  onClick={() => handleUserClick(userDetail)}
                >

                  <div className="profile-link">
                    <Avatar alt={userDetail.username} src={userDetail.imageUrl} />
                    {/* <img src={imageUrl} alt={userDetail.username} className="user-avatar" /> */}
                    <span className="user-username">{userDetail.username}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="chat-box">
          <ChatHeader user={selectedUser.current} />
          <div className="message-list" >
            {messages.map((message) => (
              <div ref={scrollRef}>
                <Message key={message._id} message={message} username={selectedUser.current.userName} />
              </div>
            ))}
          </div>
          <div className="message-input">
            <ToastContainer /> {/* Place the ToastContainer here */}
            <input
              type="text"
              placeholder="Type your message..."
              value={sendmessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

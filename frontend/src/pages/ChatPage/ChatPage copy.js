

function ChatPage() {
  const [messages, setMessages] = useState([]);
 
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    imageUrl: null,
    conversationId: null,
    userName: null,
  });
  


  // Use a useEffect to log the updated selectedUser
  useEffect(() => {
    console.log("selecteduser", selectedUser);
    
  }, [selectedUser]);

  
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
    console.log('Before updating selectedUser:', selectedUser);
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
    try {
      await setSelectedUser((prevSelectedUser) => ({
        ...prevSelectedUser, // Keep previous state properties
        ...updatedUser,      // Update with new properties
        
      }));
      console.log(selectedUser);
    } catch (error) {
      console.error('Error updating selectedUser:', error);
    }

    // Now you can access the updated selectedUser
    console.log(selectedUser); // This should show the updated value
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
                  className={selectedUser.id === userDetail.id ? "selected-user" : ""}
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
          <ChatHeader user={selectedUser} />
          <div className="message-list" >
            {messages.map((message) => (
              <div ref={scrollRef}>
                <Message key={message._id} message={message} username={selectedUser.userName} />
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

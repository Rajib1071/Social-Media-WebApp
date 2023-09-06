const socketIo = require('socket.io');
require('dotenv').config(); // Load environment variables from .env file

const io = require("socket.io")(process.env.PORT, {
    cors: {
        origin: "https://comfy-alfajores-16bf91.netlify.app",
    },
});

let users = []; // it will store userid, socketid pair

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
    //when ceonnect
    console.log(`A user connected with socket ID ${socket.id}`);

    // io.emit(eventname,messsage);  // send message to client
    // io.emit("welcome","hello user");


    //socket.on= speak socket what you want to speak , i am listening
    //io.emit= listen socket what i am speaking

    //take userId and socketId from user
    socket.on('addUser', (userId) => {
        console.log("adduser", socket.id)
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });


    //send and get message
    socket.on("sendMessage", ({ receiverId, message }) => {
        const user = getUser(receiverId);
        console.log(user.socketId)
        console.log("my",message)
        io.to(user.socketId).emit("getMessage", message);
    });

    // Handle incoming messages, join rooms, and more here
    // ...

    // Disconnect event (optional)
    socket.on('disconnect', () => {
        console.log(`Disconnected User with socket ID ${socket.id} disconnected`);
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});


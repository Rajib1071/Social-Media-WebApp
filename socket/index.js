const socketIo = require('socket.io');

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    //when ceonnect
    console.log(`A user connected with socket ID ${socket.id}`);


    // Handle incoming messages, join rooms, and more here
    // ...

    // Disconnect event (optional)
    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);
    });
});


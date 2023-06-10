const { Server } = require('socket.io');

// Store active connections
const connections = new Set();

// Function to handle WebSocket server setup
const startWebSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Replace with the origin of your client-side application
      methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    },
  });

  // Event listener for connection established
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Add the new connection to the set
    connections.add(socket);

    // Event listener for receiving messages
    socket.on('chatMessage', (message) => {
      console.log('Received message:', message);

      // Broadcast the received message to all connected clients
      connections.forEach((client) => {
        if (client !== socket && client.connected) {
          client.emit('chatMessage', message);
          console.log('Sent message to client');
        }
      });
    });

    // Event listener for disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');

      // Remove the disconnected connection from the set
      connections.delete(socket);
    });
  });

  console.log('WebSocket server is running');
};

module.exports = { startWebSocketServer };

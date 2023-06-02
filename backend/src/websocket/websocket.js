const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

// Store active connections
const connections = new Set();

// Event listener for connection established
wss.on('connection', (ws) => {
  // Add the new connection to the set
  connections.add(ws);

  // Event listener for receiving messages
  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    connections.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Event listener for disconnection
  ws.on('close', () => {
    // Remove the disconnected connection from the set
    connections.delete(ws);
  });
});

module.exports = wss;

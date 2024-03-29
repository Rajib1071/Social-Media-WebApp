const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');


const uploadDir = 'uploads'; // Define the directory name

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// // Allow requests from the client-side application
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// Connect to the database

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('common')); // Logging middleware

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);

// Start the WebSocket server
// startWebSocketServer(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "start": "nodemon src/index.js",
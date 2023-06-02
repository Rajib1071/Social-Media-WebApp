import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your WebSocket server URL

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

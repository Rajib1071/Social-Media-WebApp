// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://instapostbackend.onrender.com/api',
});

export default api;

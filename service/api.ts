import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev.gruponfa.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
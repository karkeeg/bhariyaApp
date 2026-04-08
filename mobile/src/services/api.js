import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log('Mobile API URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

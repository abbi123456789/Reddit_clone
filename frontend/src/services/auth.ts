import axios, { type AxiosInstance } from "axios";
import { isTokenExpired } from "../utils/jwt";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor definition
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        if (isTokenExpired(token)) {
            // Token is expired, trigger logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth_change'));
        } else {
            // Token is valid, attach it
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor definition
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Unauthorized, clear token and state
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth_change'));
        // We let the components detect AuthContext change and redirect.
    }
    return Promise.reject(error);
});

export default api;
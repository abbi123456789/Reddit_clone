import axios, { type AxiosInstance } from "axios";
import { isTokenExpired } from "../utils/jwt";

export const API_BASE_URL = 'http://localhost:8000';

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor definition
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        if (isTokenExpired(token)) {
            try{
                const response = await axios.post(`${config.baseURL || API_BASE_URL}/accounts/refresh`, {}, { withCredentials: true });
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                config.headers.Authorization = `Bearer ${response.data.access_token}`;
                return config;
            }catch(error){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('auth_change'));
                return Promise.reject(error);
            }
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

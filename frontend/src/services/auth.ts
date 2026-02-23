import axios, { type AxiosInstance } from "axios";

const accessToken = localStorage.getItem('accessToken')

const api:AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
    }
})


export default api;
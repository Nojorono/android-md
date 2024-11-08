// src/api/axiosInstance.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authStore from "../stores/authStore";
import Toast from "react-native-toast-message";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Request interceptor to add Authorization header dynamically
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = authStore.user.accessToken
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Set Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

// Optional response interceptor to handle global response errors
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        if (error.response && error.response.status === 401) {
            await authStore.clearUser(); // Clear the user on 401 Unauthorized
            Toast.show({
                type: 'error', text1: 'Unauthorized, please logout and try again later',
            });
            console.log('Unauthorized! Redirecting...');

        }
        return Promise.reject(error); // Handle response errors
    }
);

export default axiosInstance;

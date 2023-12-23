import axios from "axios";

export const haApi = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/automation`,
})

haApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})
import axios from "axios";

export const homeApi = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

homeApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})
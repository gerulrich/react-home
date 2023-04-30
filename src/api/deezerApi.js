import axios from "axios";

export const deezerApi = axios.create({
    baseURL: import.meta.env.VITE_DEEZER_URL,
})

deezerApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})
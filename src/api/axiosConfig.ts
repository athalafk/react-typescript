import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: baseURL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
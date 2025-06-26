import axios from 'axios';

// Buat instance axios
const apiClient = axios.create({
    baseURL: 'http://localhost:7000/api',
});

// Tambahkan interceptor untuk menyisipkan token ke header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
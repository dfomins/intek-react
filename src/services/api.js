import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or from context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// export const userService = {
//   getAll: () => api.get('/users'),
//   getById: (id) => api.get(`/products/${id}`),
//   create: (data) => api.post('/products', data),
//   update: (id, data) => api.put(`/products/${id}`, data),
//   delete: (id) => api.delete(`/products/${id}`)
// };

export default api;

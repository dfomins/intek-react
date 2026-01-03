import api from "./api";

export const notificationService = {
    getNotifications: () => api.get("/notifications"),
    getNotification: (id) => api.get(`/notifications/${id}`),
    postNotification: (payload) => api.post("/notifications", payload),
    updateNotification: (id, payload) => api.put(`/notifications/${id}`, payload),
    deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

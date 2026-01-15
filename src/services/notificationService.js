import api from "./api";

export const notificationService = {
    getNotifications: () => api.get("/notifications"),
    getNotification: (id) => api.get(`/notifications/${id}`),
    postNotification: (payload) => api.post("/manager/notifications", payload),
    updateNotification: (id, payload) => api.put(`/manager/notifications/${id}`, payload),
    deleteNotification: (id) => api.delete(`/manager/notifications/${id}`),
};

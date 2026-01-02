import api from "./api";

export const notificationService = {
    getNotifications: () => api.get("/notifications"),
    getNotification: (id) => api.get(`/notifications/${id}`),
};

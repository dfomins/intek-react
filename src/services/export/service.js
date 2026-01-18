import api from "../api";

export const exportService = {
    exportExcel: (payload) => api.post("/export", payload, { responseType: "blob" }),
};

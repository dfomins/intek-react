import api from "../api";

export const workService = {
    getHoursToday: () => api.get("/work_records/today"),
};

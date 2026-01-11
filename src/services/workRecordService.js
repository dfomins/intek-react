import api from "./api";

export const workRecordService = {
    getWorkRecords: (date) => api.get(`/work_records?date=${date}`),
};

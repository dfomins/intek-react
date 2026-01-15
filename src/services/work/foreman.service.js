import api from "../api";

export const foremanWorkService = {
    getWorkRecords: (date, workObjectId) =>
        api.get("/foreman/work_records", {
            params: {
                date: date,
                ...(workObjectId && { work_object_id: workObjectId }),
            },
        }),
    saveWorkRecords: (records) => api.post("/foreman/work_records", records),
};

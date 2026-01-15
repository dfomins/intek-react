import api from "../api";

export const managerWorkService = {
    getWorkRecords: (date, workObjectId) =>
        api.get("/manager/work_records", {
            params: {
                date: date,
                ...(workObjectId && { work_object_id: workObjectId }),
            },
        }),
    saveWorkRecords: (records) => api.post("/manager/work_records", records),
};

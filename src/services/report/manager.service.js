import api from "../api";

export const managerReportService = {
    getReport: (user_id, start_date, end_date) =>
        api.get("/manager/reports", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date,
            },
        }),
};

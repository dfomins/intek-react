import api from "../api";

export const employeeReportService = {
    getReport: (start_date, end_date) =>
        api.get("/reports", {
            params: {
                start_date: start_date,
                end_date: end_date,
            },
        }),
};

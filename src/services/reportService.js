import { employeeReportService } from "./report/employee.service";
import { managerReportService } from "./report/manager.service";

export function createReportService(role) {
    if (role === "MANAGER") {
        return {
            canSelectUser: true,
            getReport: (userId, startDate, endDate) => managerReportService.getReport(userId, startDate, endDate),
        };
    }

    return {
        canSelectUser: false,
        getReport: (_userId, startDate, endDate) => employeeReportService.getReport(startDate, endDate),
    };
}

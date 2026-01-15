import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import { lv } from "date-fns/locale";

// Service
import { userService } from "../../services/userService";
import { managerReportService } from "../../services/report/manager.service";

function ManagerReport() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userReport, setUserReport] = useState({
        work_records: [],
    });
    const [error, setError] = useState("");
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingReport, setLoadingReport] = useState(true);

    let date = new Date();

    const [dateValue, setDateValue] = useState({
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(),
    });

    const [formattedDates, setFormattedDates] = useState({
        startDate: format(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getUsersSimple();
                setUsers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0 && selectedUserId === null) {
            setSelectedUserId(users[0].id);
        }
    }, [users, selectedUserId]);

    useEffect(() => {
        const fetchUserReport = async () => {
            try {
                const response = await managerReportService.getReport(selectedUserId, formattedDates.startDate, formattedDates.endDate);
                setUserReport(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch report");
                console.log(error);
            } finally {
                setLoadingReport(false);
            }
        };

        if (selectedUserId) fetchUserReport();
    }, [selectedUserId, formattedDates]);

    const formattedRange = `${format(formattedDates.startDate, "dd/MM/yyyy", { locale: lv })} - ${format(formattedDates.endDate, "dd/MM/yyyy", { locale: lv })}`;

    const selectedUser = users.find((u) => u.id === selectedUserId);

    const totalHours = userReport.work_records.reduce((sum, record) => {
        const hours = Number(record.hours);
        return sum + (isNaN(hours) ? 0 : hours);
    }, 0);

    const isLoading = loadingUsers || loadingReport;

    if (isLoading) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="text-red-500 font-bold">{error}</h2>
            </div>
        );
    }

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Atskaite</h1>
            <div className="flex flex-col gap-4 md:flex-row mb-5">
                <div className="md:w-4/12 z-20">
                    <Datepicker
                        i18n="lv"
                        startWeekOn="mon"
                        primaryColor={"green"}
                        inputClassName="system-input pr-11 h-10 pl-3 py-2 w-full cursor-pointer"
                        toggleClassName="hidden"
                        displayFormat="DD/MM/YYYY"
                        maxDate={new Date()}
                        readOnly={true}
                        separator="-"
                        value={dateValue}
                        onChange={(newValue) => {
                            setDateValue(newValue);
                            setFormattedDates({
                                startDate: format(newValue.startDate, "yyyy-MM-dd"),
                                endDate: format(newValue.endDate, "yyyy-MM-dd"),
                            });
                        }}
                    />
                </div>
                <select className="system-input pr-11 h-10 pl-3 py-2 cursor-pointer" value={selectedUserId ?? ""} onChange={(e) => setSelectedUserId(Number(e.target.value))}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.id + ". " + user.name + " " + user.surname}
                        </option>
                    ))}
                </select>
                <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Lejuplādēt atskaiti
                </button>
            </div>
            <div className="h-[600px] bg-white shadow-sm">
                <div className="flex flex-col">
                    <div className="-m-1.5">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-auto max-h-[600px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="sticky top-0 z-10 px-6 py-3 text-start text-xs font-medium bg-white text-gray-500 uppercase">
                                                Datums
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 px-6 py-3 text-start text-xs font-medium bg-white text-gray-500 uppercase">
                                                Stundas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {userReport.work_records.length > 0 ? (
                                            userReport.work_records.map((reportRecord) => {
                                                const reportRecordDate = new Date(reportRecord.date);

                                                return (
                                                    <tr key={reportRecord.id} className="even:bg-white">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{reportRecordDate.toLocaleDateString("lv-LV")}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{reportRecord.hours}</td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="h-10 text-center">
                                                    Nav datu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedUser && (
                <div>
                    <table className="w-full">
                        <tbody>
                            <tr key={selectedUser.id} className="h-[40px] bg-white border-t-2">
                                <td className="py-[12px] px-[15px] text-left font-semibold">
                                    {formattedRange}
                                    <br />
                                    Darbinieks: {selectedUser.name} {selectedUser.surname}
                                </td>
                                <td className="py-[12px] px-[15px] text-right font-semibold">Stundas kopā: {totalHours}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ManagerReport;

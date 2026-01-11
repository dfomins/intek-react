import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { buildings } from "./Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Service
import { userService } from "../services/userService";
import { workObjectService } from "../services/workObjectService";
import { workRecordService } from "../services/workRecordService";

function Work() {
    const [users, setUsers] = useState([]);
    const [objects, setObjects] = useState([]);
    const [workRecords, setWorkRecords] = useState([]);
    const [error, setError] = useState("");
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingObjects, setLoadingObjects] = useState(true);
    const [loadingWorkRecords, setLoadingWorkRecords] = useState(true);

    const [selectedObjectId, setSelectedObjectId] = useState(null);

    const initialDate = new Date();

    // Dati priekš datumu izvēlnes
    const [dateValue, setDateValue] = useState({
        startDate: initialDate,
        endDate: initialDate,
    });

    const [formattedDate, setFormattedDate] = useState(format(initialDate, "yyyy-MM-dd"));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getUsers(selectedObjectId);
                const users = response.data.map((user) => ({
                    ...user,
                }));
                setUsers(users);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, [selectedObjectId]);

    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const response = await workObjectService.getObjectsSimple();
                const objects = response.data.map((object) => ({
                    ...object,
                }));
                setObjects(objects);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch objects");
            } finally {
                setLoadingObjects(false);
            }
        };

        fetchObjects();
    }, []);

    useEffect(() => {
        const fetchWorkRecords = async () => {
            try {
                const response = await workRecordService.getWorkRecords(formattedDate);
                const workRecords = response.data.map((workRecord) => ({
                    ...workRecord,
                }));
                setWorkRecords(workRecords);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch work records");
            } finally {
                setLoadingWorkRecords(false);
            }
        };

        fetchWorkRecords();
    }, [dateValue]);

    useEffect(() => {
        if (dateValue?.startDate) {
            setFormattedDate(format(dateValue.startDate, "yyyy-MM-dd"));
        }
    }, [formattedDate]);

    const workRecordByWorkerId = workRecords.reduce((acc, record) => {
        acc[record.worker_id] = record;
        return acc;
    }, {});

    const isLoading = loadingUsers || loadingObjects;

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

    const handleDateChange = (newValue) => {
        setDateValue(newValue);
        if (newValue) {
            const formatted = format(newValue.startDate, "yyyy-MM-dd");
            setFormattedDate(formatted);
        } else {
            setFormattedDate("");
        }
    };

    const handleObjectChange = (e) => {
        const value = e.target.value;

        setSelectedObjectId(value === "all" ? null : Number(value));
    };

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Darbs</h1>
            <div className="max-h-[1000px] md:max-h-[600px] flex max-md:flex-col shadow-md">
                <div className="flex flex-col items-center p-5 border-r border-gray bg-white">
                    <div>
                        <label>Datums:</label>
                        <Datepicker
                            i18n={"lv"}
                            startWeekOn="mon"
                            primaryColor={"green"}
                            inputClassName="system-input w-full mb-3 text-md cursor-pointer"
                            toggleClassName="absolute hidden right-0 px-3 mt-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                            displayFormat="DD/MM/YYYY"
                            useRange={false}
                            asSingle={true}
                            readOnly={true}
                            maxDate={new Date()}
                            value={dateValue}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div>
                        <label>Darbinieki:</label>
                        <select className="system-input w-full cursor-pointer" value={selectedObjectId ?? "all"} onChange={handleObjectChange}>
                            <option value="all">Visos objektos</option>
                            {objects.map((object) => (
                                <option key={object.id} value={object.id}>
                                    {object.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full overflow-y-auto">
                    <table className="table-auto w-full shadow-sm">
                        <thead className="text-white">
                            <tr>
                                <th className="ps-6 p-3 text-start sticky top-0 left-0 z-10 bg-system-blue">Nr.</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Vārds</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Uzvārds</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Stundas</th>
                                {/* <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue">
                                    <FontAwesomeIcon icon={faGear} />
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const record = workRecordByWorkerId[user.id];
                                return (
                                    <tr key={user.id} className="even:bg-white">
                                        <td className="ps-6 p-3 text-start sticky left-0">{user.id}</td>
                                        <td className="p-3 text-start">{user.name}</td>
                                        <td className="p-3 text-start">{user.surname}</td>
                                        <td className="p-3 text-start">{record?.hours ?? ""}</td>

                                        {/* <td className="p-3 text-center sticky right-0">
                                        <FontAwesomeIcon icon={faPen} className="mr-3 cursor-pointer" />
                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
                                    </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Work;

import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

// Service
import { foremanWorkObjectService } from "../../services/objects/foreman.service";
import { foremanWorkService } from "../../services/work/foreman.service";

function ForemanWork() {
    const [users, setUsers] = useState([]);
    const [objects, setObjects] = useState([]);
    const [error, setError] = useState("");
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingObjects, setLoadingObjects] = useState(true);
    const [workRecordByWorkerId, setWorkRecordByWorkerId] = useState({});

    // Izvēlētais objekts filtram
    const [selectedObjectId, setSelectedObjectId] = useState(null);

    // Rediģēšanas stāvoklis
    const [editMode, setEditMode] = useState(false);

    // Stundas katram lietotājam
    const [editedHours, setEditedHours] = useState({});

    const initialDate = new Date();

    // Dati priekš datumu izvēlnes
    const [dateValue, setDateValue] = useState({
        startDate: initialDate,
        endDate: initialDate,
    });

    const [formattedDate, setFormattedDate] = useState(format(initialDate, "yyyy-MM-dd"));

    // Iegūt visus darba objektus ielādes laikā
    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const response = await foremanWorkObjectService.getObjectsSimple();
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

    // Iegūt visus lietotājus ar to darba ierakstiem ielādes laikā
    const fetchUsersWithWorkRecords = async () => {
        setLoadingUsers(true);
        try {
            const response = await foremanWorkService.getWorkRecords(formattedDate, selectedObjectId);
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (formattedDate) fetchUsersWithWorkRecords();
    }, [formattedDate, selectedObjectId]);

    useEffect(() => {
        const map = {};
        users.forEach((user) => {
            if (user.work_record) {
                map[user.id] = user.work_record;
            }
        });
        setWorkRecordByWorkerId(map);
    }, [users]);

    useEffect(() => {
        if (dateValue?.startDate) {
            setFormattedDate(format(dateValue.startDate, "yyyy-MM-dd"));
        }
    }, [dateValue]);

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
        const objectId = value === "all" ? null : Number(value);

        setSelectedObjectId(objectId);
    };

    const enterEditMode = () => {
        const initialHours = {};

        users.forEach((user) => {
            initialHours[user.id] = user.work_record?.hours ?? "";
        });

        setEditedHours(initialHours);
        setEditMode(true);
    };

    const handleHoursChange = (userId, value) => {
        setEditedHours((prev) => ({
            ...prev,
            [userId]: value,
        }));
    };

    const saveAll = async () => {
        try {
            const records = Object.entries(editedHours).map(([userId, hours]) => ({
                worker_id: Number(userId),
                hours,
                date: formattedDate,
            }));

            await foremanWorkService.saveWorkRecords(records);

            setEditedHours({});
            setEditMode(false);

            fetchUsersWithWorkRecords();

            toast.success("Darba dati tika saglabāti");
        } catch (err) {
            toast.error("Failed to save work records");
        }
    };

    const isLoading = loadingObjects || loadingUsers;

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
            <h1 className="page-title">Darbs</h1>
            <div className="max-h-[1000px] md:max-h-[600px] flex max-md:flex-col shadow-md">
                <div className="flex flex-col items-center p-5 gap-4 border-r border-gray bg-white">
                    <div className="w-full z-20">
                        <label>Datums:</label>
                        <Datepicker
                            i18n={"lv"}
                            startWeekOn="mon"
                            primaryColor={"green"}
                            inputClassName="system-input pr-11 h-10 pl-3 py-2 w-full cursor-pointer"
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
                    <div className="w-full">
                        <label>Darbinieki:</label>
                        <select className="system-input pr-11 h-10 pl-3 py-2 w-full cursor-pointer" value={selectedObjectId ?? "all"} onChange={handleObjectChange}>
                            <option value="all">Visi</option>
                            {objects.map((object) => (
                                <option key={object.id} value={object.id}>
                                    {object.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        {!editMode ? (
                            <button className="p-3 w-full system-button bg-system-blue text-white hover:bg-system-green shadow-sm" onClick={enterEditMode}>
                                Rediģēt
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button className="px-3 w-full system-button bg-green-600 text-white hover:bg-system-green shadow-sm" onClick={saveAll}>
                                    Saglabāt
                                </button>
                                <button className="px-3 w-full system-button bg-red-600 text-white hover:bg-system-green shadow-sm" onClick={() => setEditMode(false)}>
                                    Atcelt
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full min-h-[600px]">
                    <div className="overflow-y-auto">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 py-4 ps-10 pe-4 border-b border-slate-300 bg-slate-100">
                                        <p className="block text-sm font-normal leading-none text-slate-500">Vārds, Uzvārds</p>
                                    </th>
                                    <th className="sticky top-0 p-4 border-b border-slate-300 bg-slate-100">
                                        <p className="block text-sm text-center font-normal leading-none text-slate-500">Stundas</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    const record = workRecordByWorkerId[user.id];

                                    return (
                                        <tr key={user.id} className="bg-slate-50 border-b border-slate-200">
                                            <td className="py-4 ps-10 pe-4 min-w-[120px]">
                                                <p className="flex items-center gap-2 font-semibold text-sm text-slate-800">
                                                    <span>
                                                        {user.name} {user.surname}
                                                    </span>

                                                    {user.object_ids.length === 0 && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-yellow-500">
                                                            <path fill="currentColor" fillRule="evenodd" d="M12 13.8a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1" clipRule="evenodd" />
                                                            <path fill="currentColor" d="M10.947 15.958a1.053 1.053 0 1 1 2.106 0a1.053 1.053 0 0 1-2.106 0" />
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="m15.607 4.642l5.876 10.72c1.512 2.759-.473 6.138-3.607 6.138H6.124c-3.134 0-5.12-3.38-3.607-6.139l5.876-10.72c1.566-2.855 5.648-2.855 7.214 0Zm-1.804 1c-.782-1.429-2.824-1.429-3.606 0L4.32 16.36c-.757 1.38.236 3.069 1.803 3.069h11.752c1.567 0 2.56-1.69 1.803-3.07z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </p>
                                            </td>
                                            <td className="h-full px-4 min-w-[100px]">
                                                <p className="text-center block text-sm text-slate-800">
                                                    {editMode ? (
                                                        <input
                                                            className="system-input h-[35px] w-[35px] p-0 m-0 text-center border border-slate-300"
                                                            value={editedHours[user.id] ?? ""}
                                                            onChange={(e) => handleHoursChange(user.id, e.target.value)}
                                                        />
                                                    ) : (
                                                        <span>{user.work_record?.hours ?? ""}</span>
                                                    )}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <table className="border-t border-slate-300">
                        <tbody>
                            <tr className="flex max-lg:flex-col justify-around items-center min-h-10 bg-white text-left">
                                <th colSpan={3}>
                                    <p className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" className="text-yellow-500">
                                            <path fill="currentColor" fillRule="evenodd" d="M12 13.8a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1" clipRule="evenodd" />
                                            <path fill="currentColor" d="M10.947 15.958a1.053 1.053 0 1 1 2.106 0a1.053 1.053 0 0 1-2.106 0" />
                                            <path
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                d="m15.607 4.642l5.876 10.72c1.512 2.759-.473 6.138-3.607 6.138H6.124c-3.134 0-5.12-3.38-3.607-6.139l5.876-10.72c1.566-2.855 5.648-2.855 7.214 0Zm-1.804 1c-.782-1.429-2.824-1.429-3.606 0L4.32 16.36c-.757 1.38.236 3.069 1.803 3.069h11.752c1.567 0 2.56-1.69 1.803-3.07z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>-</span>
                                        <span className="text-sm font-medium">darbiniekam nav piesaistīti darba objekti</span>
                                    </p>
                                </th>

                                <th colSpan="2">s - slimība | a - attaisnots</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ForemanWork;

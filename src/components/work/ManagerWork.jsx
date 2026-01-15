import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Work from "./Work";

// Service
import { managerWorkObjectService } from "../../services/objects/manager.service";
import { managerWorkService } from "../../services/work/manager.service";

function ManagerWork() {
    const [users, setUsers] = useState([]);
    const [objects, setObjects] = useState([]);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingObjects, setLoadingObjects] = useState(true);

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
                const response = await managerWorkObjectService.getObjectsSimple();
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
            const response = await managerWorkService.getWorkRecords(formattedDate, selectedObjectId);
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
        const updated = {
            ...editedHours,
            [userId]: value.toLowerCase(),
        };

        setEditedHours(updated);
        setErrors(validate(updated));
    };

    const validate = (values) => {
        const errors = {};

        Object.entries(values).forEach(([userId, value]) => {
            if (value === "" || value == null) return;

            if (value === "a" || value === "s") return;

            const num = Number(value);
            if (!Number.isInteger(num) || num < 1 || num > 8) {
                errors[userId] = "Stundām jābūt 1–8 vai 'a' / 's'";
            }
        });

        return errors;
    };

    const saveAll = async () => {
        try {
            const validationErrors = validate(editedHours);
            if (Object.keys(validationErrors).length > 0) return;

            const records = Object.entries(editedHours).map(([userId, hours]) => ({
                worker_id: Number(userId),
                hours,
                date: formattedDate,
            }));

            await managerWorkService.saveWorkRecords(records);

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
                                <button
                                    className="px-3 w-full system-button bg-red-600 text-white hover:bg-system-green shadow-sm"
                                    onClick={() => {
                                        setErrors("");
                                        setEditMode(false);
                                    }}
                                >
                                    Atcelt
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <Work users={users} editMode={editMode} editedHours={editedHours} handleHoursChange={handleHoursChange} errors={errors} />
            </div>
        </div>
    );
}

export default ManagerWork;

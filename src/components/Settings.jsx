// class 'profile-settings-panel' is defined in the 'index.css' file
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

// Service
import { userService } from "../services/userService";

function Settings() {
    const [user, setUser] = useState(null);
    const [dateValue, setDateValue] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getUserInformationUpdate();
                setUser(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user");
            }
        };

        if (user) {
            // Dati priekš datumu izvēlnes lauka
            [dateValue, setDateValue] = useState({
                startDate: user.dob,
                endDate: user.dob,
            });
        }

        fetchUser();
    }, []);

    const { handleSubmit } = useForm({});

    if (error) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="text-red-500 font-bold">{error}</h2>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Profila iestatījumi</h1>
            <div className="grid md:grid-cols-2 gap-7 text-white">
                <div className="profile-settings-panel">
                    <h2 className="mb-3 font-medium">Pamata informācija</h2>
                    <form>
                        <label>Vārds</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" value={user.name} />
                        <label>Uzvārds</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" value={user.surname} />
                        <label>E-pasts</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-5" type="text" value={user.email} />
                        <button type="submit" className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">
                            Apstiprināt
                        </button>
                    </form>
                </div>
                <div className="profile-settings-panel">
                    <h2 className="mb-3 font-medium">Paroles maiņa</h2>
                    <form>
                        <label>Vecā parole</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="password" />
                        <label>Jaunā parole</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="password" />
                        <label>Jaunās paroles apstiprināšana</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-5" type="password" />
                        <button type="submit" className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">
                            Atjaunot paroli
                        </button>
                    </form>
                </div>
                <div className="md:col-span-2 profile-settings-panel">
                    <h2 className="mb-3 font-medium">Papildus informācija</h2>
                    <form>
                        <label>Personas kods</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" />
                        <label>Dzimšanas datums</label>
                        <Datepicker
                            i18n={"lv"}
                            startWeekOn="mon"
                            primaryColor={"green"}
                            inputClassName="w-full system-input pr-11 h-10 pl-3 py-2 mb-3 cursor-pointer"
                            toggleClassName="absolute right-0 px-3 mt-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                            displayFormat="DD/MM/YYYY"
                            useRange={false}
                            asSingle={true}
                            readOnly={true}
                            value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)}
                        />
                        <label>Pilsēta</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" />
                        <label>Iela</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" />
                        <label>Mājas numurs</label>
                        <input className="w-full system-input pr-11 h-10 pl-3 py-2 mb-3" type="text" />
                        <button type="submit" className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">
                            Saglabāt
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;
